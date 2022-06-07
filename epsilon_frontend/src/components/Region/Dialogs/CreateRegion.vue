<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          v-model="form.name"
          label="name"
        />
        <q-input
          v-model="form.schema"
          label="schema"
        />
        <q-input
          type="textarea"
          v-model="form.name_aliases"
          label="alias"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent } from 'quasar'

import { ref } from 'vue'
import api from '../../../api/region'
import { directivesStore } from '../../../stores/directivesStore'

export default {
  name: "CreateRegion",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const form = ref({
      name: '',
      schema: '',
      name_aliases: ''
    })

    const region_store = directivesStore(api)

    const addNewData = async () => {
      const infoForRequest = {
        name: form.value.name,
        schema: form.value.schema,
        name_aliases: form.value.name_aliases.split(',')
      }
      const response = await region_store.createData(infoForRequest)
      const info = {
        id: response.data,
        name: form.value.name,
        schema: form.value.schema,
        name_aliases: form.value.name_aliases.split(',')
      }
      region_store.data.unshift(info)
      region_store.data = region_store.data.slice(0, region_store.options_data.request.limit)
      onDialogOK()
    }

    return{
      form,

      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      addNewData,
    }
  }
}
</script>

<style scoped>

</style>
