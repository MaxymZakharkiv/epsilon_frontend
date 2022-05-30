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
        <q-btn color="primary" label="OK" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from '../../../stores/directivesStore'
import api_city from '../../../api/city'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "EditCity",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const store_city = directivesStore(api_city)
    console.log(store_city.edit_data)

    const options = ref([])
    const form = ref({
      name: store_city.edit_data.name,
      type: store_city.edit_data.type,
      name_aliases: store_city.edit_data.name_aliases,
      region: store_city.edit_data.region
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
      update(() => {
        console.log(data)
      })
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      filterType,
      filterRegion,

      form,
      options,
    }
  }
}
</script>

<style scoped>

</style>
