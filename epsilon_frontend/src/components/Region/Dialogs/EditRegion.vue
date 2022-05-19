<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="formEdit.name" label="name" />
        <q-input v-model="formEdit.schema" label="schema" />
        <q-input type="textarea" v-model="formEdit.name_aliases" label="alias" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="editData(formEdit)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import api from '../../../api/region'
import { directivesStore } from '../../../stores/directivesStore'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "EditRegion",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const store = directivesStore(api)
    const formEdit = ref({
      id: store.edit_data.id,
      name: store.edit_data.name,
      schema: store.edit_data.schema,
      name_aliases: store.edit_data.name_aliases.join(', ')
    })

    const editData = async (data) => {
      console.log(data)
      const infoEdit = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(', ')
      }
      await store.editData(infoEdit)
      onDialogOK()
    }

    return{
      formEdit,
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,
      editData
    }
  }
}
</script>

<style scoped>

</style>
