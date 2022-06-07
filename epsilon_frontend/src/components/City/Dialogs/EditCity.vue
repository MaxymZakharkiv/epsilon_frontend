<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-select
          v-model="form.region"
          :options="region_list"
          label="Регіон"
          option-value="id"
          option-label="name"
          @filter="filterRegion"
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
          v-model="form.district"
          :options="district_list"
          label="Райони"
          option-value="id"
          option-label="name"
          @filter="filterDistrict"
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
          v-model="form.community"
          :options="community_list"
          label="Громади"
          option-value="id"
          option-label="name"
          @filter="filterCommunity"
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
        <q-btn color="primary" label="OK" @click="editData(form)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from '../../../stores/directivesStore'
import api_city from '../../../api/city'
import { useAutocomplete } from '../../../composition/autocomplete'
import { useSelect } from '../../../composition/select'

import api_region from '../../../api/region'
import api_district from '../../../api/district'
import api_community from '../../../api/community'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "EditCity",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()


    const region_list = ref([])
    const district_list = ref([])
    const community_list = ref([])


    const store_city = directivesStore(api_city)
    const region_store = directivesStore(api_region, 'regionStore')
    const district_store = directivesStore(api_district, 'districtStore')
    const community_store = directivesStore(api_community, 'communityStore')
    const {autocomplete: custAutocomplete} = useAutocomplete()
    const {select: custSelect} = useSelect()

    const options = ref([])

    const form = ref({
      id: store_city.edit_data.id,
      name: store_city.edit_data.name,
      type: store_city.edit_data.type,
      schema: store_city.edit_data.schema,
      name_aliases: store_city.edit_data.name_aliases.join(', '),
      region: store_city.edit_data.region,
      district: store_city.edit_data.district,
      community: store_city.edit_data.community
    })


    const type = [
      {id: 0, name:'область'},
      {id: 1, name:'обл. центр'},
      {id: 2, name:'район'},
      {id: 3, name:'районний центр'},
      {id: 4, name:'село міського типу'},
      {id: 5, name:'село'},
    ]

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

    const filterRegion = (data, update) => {
      update(
        custAutocomplete(region_store, data)
          .then(response => {
            region_list.value = response.value
          })
      )
    }

    const filterDistrict = (data, update) => {
      update(
        custSelect(district_store, form.value.region.id, "region_id")
          .then(response => {
            district_list.value = response.value
          })
      )
    }

    const filterCommunity = (data, update) => {
      update(
        custSelect(community_store, form.value.district.id, "district_id")
          .then(response => {
            community_list.value = response.value
          })
      )
    }

    const editData = async (data) => {

      const infoRequest = {
        id: data.id,
        name: data.name,
        schema: data.region.schema,
        region_id: data.region.id,
        district_id: data.district.id,
        community_id: data.community.id,
        name_aliases: data.name_aliases.split(','),
        type: data.type?.id ?? data.type
      }

      const response = await store_city.editData(infoRequest)

      const infoForTable = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        district: data.district,
        community: data.community,
        region: data.region,
        name_aliases: data.name_aliases.split(','),
        type: data.type?.id ?? data.type
      }

      let index = store_city.data.findIndex(obj => obj.id === response.data.id)
      store_city.data[index] = infoForTable

      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterType,
      filterRegion,
      filterDistrict,
      filterCommunity,
      editData,

      form,
      options,
      region_list,
      district_list,
      community_list
    }
  }
}
</script>

<style scoped>

</style>
