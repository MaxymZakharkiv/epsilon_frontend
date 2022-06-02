<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          label="name"
          v-model="formEdit.name"
        />
        <q-select
          v-model="formEdit.autocomplete"
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
        <q-input
          v-model="formEdit.name_aliases"
          type="textarea"
          label="alias"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="editData(formEdit)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from '../../../stores/directivesStore'
import { useAutocomplete } from '../../../composition/autocomplete'
import api_district from '../../../api/district'
import api_region from '../../../api/region'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "EditDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const store_district = directivesStore(api_district)
    const store_region = directivesStore(api_region, 'regionStore')
    const {autocomplete: custAutocomplete} = useAutocomplete()

    const region_list = ref([])

    console.log(store_district.edit_data)

    const formEdit = ref({
      id: store_district.edit_data.id,
      region: store_district.edit_data.region,
      name: store_district.edit_data.name,
      schema: store_district.edit_data.schema,
      name_aliases: store_district.edit_data.name_aliases.join(', '),
      autocomplete: store_district.edit_data.region
    })

    const setFilter = (data, update) => {
      update(
        custAutocomplete(store_region, data)
          .then(response => {
            region_list.value = response.value
          })
      )
    }

    const editData = async (data) => {
      console.log(data.region.id)
      console.log(data.autocomplete)
      const infoEdit = {
        id: data.id,
        name: data.name,
        schema: data.autocomplete.schema,
        name_aliases: data.name_aliases.split(','),
        region_id: data.autocomplete.id
      }
      const data_for_table = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
        region:{
          id: data.autocomplete.id,
          name: data.autocomplete.name
        }
      }
      await store_district.editData(infoEdit, data_for_table)
      onDialogOK()
    }

    return{
      region_list,
      formEdit,

      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      editData,
      setFilter,
    }

  }
}
</script>

<style scoped>

</style>
