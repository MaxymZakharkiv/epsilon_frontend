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
        <q-btn color="primary" label="OK" @click="editData(form)" />
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
  name: "EditPeople",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const people_store = directivesStore(api_people)
    const city_store = directivesStore(api_city, 'cityStore')
    const street_store = directivesStore(api_street, 'streetStore')

    console.log(people_store.edit_data)
    const form = ref({
      id: people_store.edit_data.id,
      schema: people_store.edit_data.schema,
      secret_id: people_store.edit_data.secret_id,
      secret_id_short: people_store.edit_data.secret_id_short,
      last_name: people_store.edit_data.last_name,
      first_name: people_store.edit_data.first_name,
      middle_name: people_store.edit_data.middle_name,
      building: people_store.edit_data.building,
      building_suffix: people_store.edit_data.building_suffix,
      corpus: people_store.edit_data.corpus,
      apartment: people_store.edit_data.apartment,
      apartment_suffix: people_store.edit_data.apartment_suffix,
      block: people_store.edit_data.block,
      inpp: people_store.edit_data.inpp,
      hd: people_store.edit_data.hd,
      residents: people_store.edit_data.residents,
      space: people_store.edit_data.space,
      rooms: people_store.edit_data.rooms,
      privilege: people_store.edit_data.privilege,
      comment: people_store.edit_data.comment,
      city: people_store.edit_data.city,
      city_district: people_store.edit_data.city_district,
      street: people_store.edit_data.street,
      gender: people_store.edit_data.gender,
      birthday: people_store.edit_data.birthday
    })
    const {autocomplete: custAutocomplete} = useAutocomplete()
    const {select: custSelect} = useSelect()

    const city_list = ref([])
    const street_list = ref([])

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

    const editData = async (data) => {
      // const infoData = {
      //   id: data.id,
      //   schema: data.schema,
      //   apartment: data.apartment,
      //   apartment_suffix: data.apartment_suffix,
      //   birthday: data.birthday,
      //   block: data.block,
      //   building: data.building,
      //   building_suffix: data.building_suffix,
      //   city_id: data.city.id,
      //   comment: data.comment,
      //   corpus: data.corpus,
      //   first_name: data.first_name,
      //   last_name: data.last_name,
      //   middle_name: data.middle_name,
      //   gender: data.gender,
      //   hd: data.hd,
      //   inpp: data.inpp,
      //   privilege: data.privilege,
      //   residents: data.residents,
      //   rooms: data.rooms,
      //   space: data.space,
      //   street_id: data.street.id
      // }
      const infoData = {
        person_s:{
          schema: data.schema,
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
        },
        person_id: data.id
      }
      const info_for_table = {
        id: data.id,
        schema: data.schema,
        apartment: data.apartment,
        apartment_suffix: data.apartment_suffix,
        birthday: data.birthday,
        block: data.block,
        building: data.building,
        building_suffix: data.building_suffix,
        city: data.city,
        city_district: data.city_district,
        secret_id: data.secret_id,
        secret_id_short: data.secret_id_short,
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
      await people_store.editData(infoData, info_for_table)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterCity,
      editData,
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
