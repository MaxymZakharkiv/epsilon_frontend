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
        <q-btn color="primary" label="OK" @click="addNewData(form)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

import { directivesStore } from '../../../stores/directivesStore'

import api_region from '../../../api/region'
import api_district from '../../../api/district'
import api_community from '../../../api/community'
import api_city from '../../../api/city'

export default {
  name: "CreateCity",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const form = ref({
      name:'',
      name_aliases:'',
      type:null,
      district:null,
      region:null,
      community:null
    })

    const options = ref([])
    const region_list = ref([])
    const district_list = ref([])
    const community_list = ref([])

    const city_store = directivesStore(api_city)
    const region_store = directivesStore(api_region, 'regionStore')
    const district_store = directivesStore(api_district, 'districtStore')
    const community_store = directivesStore(api_community, 'communityStore')

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
      update( async () => {
        region_store.options_data.request.limit = 50
        await Promise.race([region_store.getData(region_store.options_data)]).then(response => {
          console.log(response)
          region_list.value = response
        })
      })
    }

    const filterDistrict = (data, update) => {
      update( async () => {
        const info = [{
          field:"region_id",
          operator:"=",
          value: form.value.region.id
        }]
        district_store.options_data.request.limit = 50
        district_store.options_data.request.filter_by = info
        await Promise.race([district_store.getData(district_store.options_data)]).then(response => {
          console.log(response)
          district_list.value = response
        })
      })
    }

    const filterCommunity = (data, update) => {
      update( async () => {
        const info = [{
          field: 'district_id',
          operator: '=',
          value: form.value.district.id
        }]
        community_store.options_data.request.limit = 50
        community_store.options_data.request.filter_by = info
        await Promise.race([community_store.getData(community_store.options_data)]).then(response => {
          console.log(response)
          community_list.value = response
        })
      })
    }

    const addNewData = async (data) => {
      const infoRequest = {
        name: data.name,
        schema: data.region.schema,
        region_id: data.region.id,
        district_id: data.district.id,
        community_id: data.community.id,
        name_aliases: data.name_aliases.split(','),
        type: data.type.id
      }
      const infoForTable = {
        name: data.name,
        schema: data.region.schema,
        district: data.district,
        community: data.community,
        region: data.region,
        name_aliases: data.name_aliases.split(','),
        type: data.type.name
      }
      await city_store.createData(infoRequest, infoForTable)
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
      addNewData,

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
