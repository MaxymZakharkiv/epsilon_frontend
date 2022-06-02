<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-select
          v-model="form.city"
          :options="city_list"
          label="Місто"
          option-value="id"
          option-label="name"
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
        <q-select
          v-model="form.city_district"
          :options="city_district_list"
          label="Райони міста"
          option-value="id"
          option-label="name"
          @filter="filterCityDistrict"
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
          label="name"
          v-model="form.name"
        />
        <q-select
          v-model="form.type"
          :options="options"
          use-input
          label="Тип населеного пункту"
          option-value="id"
          option-label="name"
          @filter="filterType"
        />
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

import { directivesStore } from '../../../stores/directivesStore'

import api_street from '../../../api/street'
import api_city from '../../../api/city'
import api_city_district from '../../../api/city_district'
import { useAutocomplete } from '../../../composition/autocomplete'
import { useSelect } from '../../../composition/select'

export default {
  name: "EditStreet",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const street_store = directivesStore(api_street)
    const city_store = directivesStore(api_city, "cityStore")
    const city_district_store = directivesStore(api_city_district, "cityDistrictStore")

    console.log(street_store.edit_data)

    const form = ref({
      id: street_store.edit_data.id,
      name: street_store.edit_data.name,
      name_aliases: street_store.edit_data.name_aliases.join(','),
      type: street_store.edit_data.type,
      city: street_store.edit_data.city,
      schema: street_store.edit_data.schema,
      city_district: street_store.edit_data.city_district
    })
    const options = ref([])
    const city_list = ref([])
    const city_district_list = ref([])

    const type = [
      {id: 0, name:'область'},
      {id: 1, name:'обл. центр'},
      {id: 2, name:'район'},
      {id: 3, name:'районний центр'},
      {id: 4, name:'село міського типу'},
      {id: 5, name:'село'},
    ]
    const {autocomplete: custAutocomplete} = useAutocomplete()
    const {select: custSelect} = useSelect()

    const filterType = (data, update) => {
      if(data === ''){
        update(() => {
          options.value = type
        })
      }
      update(() => {
        const needle = data.toLowerCase()
        options.value = type.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    }

    const filterCity = (data, update) => {
      update(
        custAutocomplete(city_store, data)
          .then(response => {
            city_list.value = response.value
          })
      )
    }

    const filterCityDistrict = (data, update) => {
      update(
        custSelect(city_district_store, form.value.city.id, "city_id")
          .then(response => {
            city_district_list.value = response.value
          })
      )
    }

    const addNewData = async (data) => {
      const infoStreet = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
        city_id: data.city.id,
        city_district_id: data.city_district.id,
        type: data.type?.id ?? data.type
      }
      const infoForTable = {
        data: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
        city:{
          id: data.city.id,
          name: data.city.name
        },
        city_district: {
          id: data.city_district.id,
          name: data.city_district.name
        },
        type: data.type?.id ?? data.type
      }
      console.log(infoStreet)
      await street_store.editData(infoStreet, infoForTable)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterType,
      filterCity,
      filterCityDistrict,
      addNewData,

      form,
      options,
      city_list,
      city_district_list
    }
  }
}
</script>

<style scoped>

</style>
