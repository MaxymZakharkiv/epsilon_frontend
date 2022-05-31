<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="form.name" label="name" />
        <q-select
          v-model="form.city"
          :options="options_city"
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
    const options_city = ref([])

    const store_city = directivesStore(api_city, "storeCity")
    const store_city_district = directivesStore(api_city_district)

    const filterCity = (data, update) => {
      update(async () => {
        store_city.options_data.request.limit = 100
        await Promise.race([store_city.getData(store_city.options_data)]).then(response => {
          options_city.value = response
        })
      })
    }

    const addNewData = async (data) => {
      console.log(data)
      const info = {
        name: data.name,
        name_aliases: data.name_aliases.split(','),
        city_id: data.city.id,
        schema: data.city.schema
      }
      const info_for_table = {
        name: data.name,
        name_aliases: data.name_aliases.split(','),
        schema: data.city.schema,
        city:{
          id: data.city.id,
          name: data.city.name
        }
      }
      await store_city_district.createData(info, info_for_table)
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
      options_city
    }
  }
}
</script>

<style scoped>

</style>
