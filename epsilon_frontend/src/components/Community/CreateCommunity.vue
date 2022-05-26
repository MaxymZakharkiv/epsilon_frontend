<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          label="name"
          v-model="form.name"
        />
        <q-select
          v-model="form.autocomplete"
          use-input
          hide-selected
          :options="options"
          fill-input
          input-debounce="500"
          option-value="id"
          option-label="name"
          label="Райони"
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
          v-model="form.name_aliases"
          type="textarea"
          label="alias"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData(form)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

import api_district from '../../api/district'
import api_community from '../../api/communities'
import { directivesStore } from '../../stores/directivesStore'

export default {
  name: "CreateCommunity",
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
    const options = ref([])

    const store_community = directivesStore(api_community)
    const store_district = directivesStore(api_district, 'storeDistrict')


    const setFilter = (data, update) => {
      update( async () => {
        store_district.options_data.request.filter_by = []
        const info = {
          field:'name',
          operator:'like',
          value: data+'%'
        }
        store_district.options_data.request.filter_by.push(info)
        await Promise.race([store_district.getData(store_district.options_data)]).then(response => {
          console.log(response)
          options.value = response
        })
      })
    }

    const addNewData = async (data) => {
      console.log(data)
      const info = {
        name: data.name,
        schema: data.autocomplete.schema,
        district_id: data.autocomplete.id,
        name_aliases: data.name_aliases.split(',')
      }
      const data_community = {
        name: data.name,
        schema: data.autocomplete.schema,
        name_aliases: data.name_aliases.split(','),
        district:{
          id: data.autocomplete.id,
          name: data.autocomplete.name
        }
      }
      console.log(info)
      await store_community.createData(info, data_community)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      addNewData,
      setFilter,

      form,
      options
    }
  }
}
</script>

<style scoped>

</style>
