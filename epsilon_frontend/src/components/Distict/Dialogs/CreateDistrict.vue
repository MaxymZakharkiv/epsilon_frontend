<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="form.name" label="name" />
        <q-select
          v-model="autocomplete"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="options"
          option-value="id"
          option-label="name"
          @filter="setFilter"
          label="Регіони"
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
        <q-btn color="primary" label="OK"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from 'stores/directivesStore'
import api from '../../../api/districts'
import { useDialogPluginComponent } from 'quasar'

import { ref } from 'vue'
import http from '../../../lib/http'

export default {
  name: "CreateDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const autocomplete = ref(null)
    const options = ref([])

    const form = ref({
      region_id: 1,
      name:'',
      name_aliases:''
    })

    const store = directivesStore(api)

    const setFilter = (data, update) => {
      update(() => {
        console.log(data)
      })
    }

    return{
      options,
      autocomplete,
      form,
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,
      setFilter
    }
  }
}
</script>

<style scoped>

</style>
