<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="form.name" label="name" />
        <q-select
          v-model="form.city"
          :options="city_list"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          option-value="id"
          option-label="name"
          label="Міста"
          @filter="filterCity"
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

import { useDialogPluginComponent } from 'quasar'
import { useAutocomplete } from '../../../composition/autocomplete'
import { ref } from 'vue'

import api_city_district from '../../../api/city_district'
import api_city from '../../../api/city'

import { directivesStore } from '../../../stores/directivesStore'

export default {
  name: "CreateCityDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const form = ref({
      name:'',
      name_aliases:'',
      city:''
    })

    const city_list = ref([])
    const store_city = directivesStore(api_city, "storeCity")
    const store_city_district = directivesStore(api_city_district)
    const {autocomplete: custAutocomplete} = useAutocomplete()

    const filterCity = (data, update) => {
      update(
        custAutocomplete(store_city, data)
          .then(response => {
            city_list.value = response.value
          })
      )
    }

    const addNewData = async (data) => {
      console.log(data)
      const info = {
        name: data.name,
        name_aliases: data.name_aliases.split(','),
        city_id: data.city.id,
        schema: data.city.schema
      }

      const response  = await store_city_district.createData(info)

      const infoForTable = {
        id: response.data,
        name: data.name,
        name_aliases: data.name_aliases.split(','),
        schema: data.city.schema,
        city:{
          id: data.city.id,
          name: data.city.name
        }
      }

      store_city_district.data.unshift(infoForTable)
      store_city_district.data = store_city_district.data.slice(0, store_city_district.options_data.request.limit)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterCity,
      addNewData,

      form,
      city_list
    }
  }
}
</script>

<style scoped>

</style>
