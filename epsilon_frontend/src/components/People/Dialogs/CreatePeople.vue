<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          label="last_name*"
          v-model="form.last_name"
        />
        <q-input
          label="first_name"
          v-model="form.first_name"
        />
        <q-input
          label="middle_name"
          v-model="form.middle_name"
        />
        <q-input
          label="building*"
          v-model="form.building"
        />
        <q-input
          label="building_suffix"
          v-model="form.building_suffix"
        />
        <q-input
          label="corpus"
          v-model="form.corpus"
        />
        <q-input
          label="apartment*"
          v-model="form.apartment"
        />
        <q-input
          label="apartment_suffix"
          v-model="form.apartment_suffix"
        />
        <q-input
          label="block"
          v-model="form.block"
        />
        <q-input
          label="inpp"
          v-model="form.inpp"
        />
        <q-input
          label="hd"
          v-model="form.hd"
        />
        <q-input
          label="residents"
          v-model="form.residents"
        />
        <q-input
          label="space"
          v-model="form.space"
        />
        <q-input
          label="rooms"
          v-model="form.rooms"
        />
        <q-input
          label="privilege"
          v-model="form.privilege"
        />
        <q-input
          label="comment"
          v-model="form.comment"
        />
        <q-select
          v-model="form.city"
          :options="city_list"
          label="Місто*"
          use-input
          input-debounce="500"
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
        <q-input
          label="city_district"
          v-model="form.city_district"
        />
        <q-select
          v-model="form.street"
          :options="street_list"
          label="Вулиця*"
          use-input
          input-debounce="500"
          option-value="id"
          option-label="name"
          @filter="filterStreet"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Дані відсутні
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-radio v-model="form.gender" val="Male" label="Male" />
        <q-radio v-model="form.gender" val="Female" label="Female" />
        <q-input
          label="birthday"
          v-model="form.birthday"
          mask="date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.birthday">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
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

import api_city from '../../../api/city'
import api_street from '../../../api/street'
import api_people from '../../../api/people'

import { directivesStore } from '../../../stores/directivesStore'
import { useAutocomplete } from '../../../composition/autocomplete'
import { useSelect } from '../../../composition/select'


export default {
  name: "CreatePeople",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const form = ref({
      last_name: null,
      first_name: null,
      middle_name: null,
      building: null,
      building_suffix: null,
      corpus: null,
      apartment: null,
      apartment_suffix: null,
      block: null,
      inpp: null,
      hd: null,
      residents: null,
      space: null,
      rooms: null,
      privilege: null,
      comment: null,
      city: null,
      city_district: null,
      street: null,
      gender: null,
      birthday: null
    })
    const {autocomplete: custAutocomplete} = useAutocomplete()
    const {select: custSelect} = useSelect()

    const city_list = ref([])
    const street_list = ref([])

    const people_store = directivesStore(api_people)
    const city_store = directivesStore(api_city, 'cityStore')
    const street_store = directivesStore(api_street, 'streetStore')

    const filterCity = (data, update) => {
      update(
        custAutocomplete(city_store, data)
          .then(response => {
            city_list.value = response.value
          })
      )
    }

    const filterStreet = (data, update) => {
      console.log(form.value.city_district?.id ?? form.value.city.id)
      update(
        custSelect(street_store, form.value.city.id, "city_id")
          .then(response => {
            street_list.value = response.value
          })
      )
    }

    const addNewData = async (data) => {
      const infoData = {
        schema: data.city.schema,
        apartment: data.apartment,
        apartment_suffix: data.apartment_suffix,
        birthday: data.birthday,
        block: data.block,
        building: data.building,
        building_suffix: data.building_suffix,
        city_id: data.city.id,
        comment: data.comment,
        corpus: data.corpus,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        gender: data.gender,
        hd: data.hd,
        inpp: data.inpp,
        privilege: data.privilege,
        residents: data.residents,
        rooms: data.rooms,
        space: data.space,
        street_id: data.street.id
      }
      const info_for_table = {
        schema: data.city.schema,
        apartment: data.apartment,
        apartment_suffix: data.apartment_suffix,
        birthday: data.birthday,
        block: data.block,
        building: data.building,
        building_suffix: data.building_suffix,
        city: data.city,
        city_district: data.city_district,
        comment: data.comment,
        corpus: data.corpus,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        gender: data.gender,
        hd: data.hd,
        inpp: data.inpp,
        privilege: data.privilege,
        residents: data.residents,
        rooms: data.rooms,
        space: data.space,
        street: data.street
      }
      await people_store.createData(infoData, info_for_table)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterCity,
      addNewData,
      filterStreet,

      form,
      city_list,
      street_list
    }
  }
}
</script>

<style scoped>

</style>
