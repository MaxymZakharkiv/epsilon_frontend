<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          label="name"
          v-model="formEdit.name"
        />
        <q-input
          v-model="formEdit.name_aliases"
          type="textarea"
          label="alias"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="editData(formEdit)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from 'stores/directivesStore'
import api_community from '../../../api/community'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "EditCommunity",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const store_community = directivesStore(api_community)

    const formEdit = ref({
      id: store_community.edit_data.id,
      district: store_community.edit_data.district,
      name: store_community.edit_data.name,
      schema: store_community.edit_data.schema,
      name_aliases: store_community.edit_data.name_aliases.join(', ')
    })

    const editData = async (data) => {
      const infoEdit = {
        id: data.id,
        district_id: data.district.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
      }
      const data_for_table = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
        district:{
          id: data.district.id,
          name: data.district.name
        }
      }
      console.log(infoEdit)
      console.log(data_for_table)
      await store_community.editData(infoEdit, data_for_table)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      formEdit,

      editData,
    }
  }
}
</script>

<style scoped>

</style>
