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
  name: "EditCityDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const options_city = ref([])

    const store_city = directivesStore(api_city, "storeCity")
    const store_city_district = directivesStore(api_city_district)

    console.log(store_city_district.edit_data)

    const form = ref({
      id: store_city_district.edit_data.id,
      name: store_city_district.edit_data.name,
      name_aliases: store_city_district.edit_data.name_aliases.join(','),
      city: store_city_district.edit_data.city,
      schema: store_city_district.edit_data.schema
    })


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
        id: data.id,
        name: data.name,
        name_aliases: data.name_aliases.split(','),
        city_id: data.city.id,
        schema: data.schema
      }
      const info_for_table = {
        id: data.id,
        name: data.name,
        name_aliases: data.name_aliases.split(','),
        schema: data.schema,
        city:{
          id: data.city.id,
          name: data.city.name
        }
      }
      await store_city_district.editData(info, info_for_table)
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
