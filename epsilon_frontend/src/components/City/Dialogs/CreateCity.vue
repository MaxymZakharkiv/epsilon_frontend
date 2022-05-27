<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
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


    const region_store = directivesStore(api_region, 'regionStore')

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
        await Promise.race([region_store.getData(region_store.options_data)]).then(response => {
          console.log(response)
          region_list.value = response
        })
      })
    }

    const addNewData = (data) => {
      console.log(data)
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterType,
      filterRegion,
      addNewData,

      form,
      options,
      region_list
    }
  }
}
</script>

<style scoped>

</style>
