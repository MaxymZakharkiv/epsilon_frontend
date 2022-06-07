<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="form.name" label="name" />
        <q-select
          v-model="form.autocomplete"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="region_list"
          option-value="id"
          option-label="name"
          label="Регіони"
          @filter="setFilter"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Дані відсутні
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input type="textarea" v-model="form.name_aliases" label="alias" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData(form)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from '../../../stores/directivesStore'
import api_region from '../../../api/region'
import api_district from '../../../api/district'
import { useAutocomplete } from '../../../composition/autocomplete'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "CreateDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const form = ref({
      name:'',
      name_aliases:'',
      autocomplete: null
    })
    const region_list = ref([])

    const store_region = directivesStore(api_region, 'regionStore')
    const store_district = directivesStore(api_district)
    const {autocomplete: custAutocomplete} = useAutocomplete()

    const setFilter = (data, update) => {
      update(
        custAutocomplete(store_region, data)
          .then(response => {
            region_list.value = response.value
          })
      )
    }

    const addNewData = async (data) => {
      const info = {
        name: data.name,
        schema: data.autocomplete.schema,
        name_aliases: data.name_aliases.split(','),
        region_id: data.autocomplete.id
      }
      const response = await store_district.createData(info)

      const data_district = {
        id: response.data,
        name: data.name,
        schema: data.autocomplete.schema,
        name_aliases: data.name_aliases.split(','),
        region:{
          id: data.autocomplete.id,
          name: data.autocomplete.name
        }
      }
      store_district.data.unshift(data_district)
      store_district.data = store_district.data.slice(0, store_district.options_data.request.limit)
      onDialogOK()
    }

    return{
      region_list,
      form,

      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      setFilter,
      addNewData
    }
  }
}
</script>

<style scoped>

</style>
