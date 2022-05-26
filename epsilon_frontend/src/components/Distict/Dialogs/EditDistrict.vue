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

import { directivesStore } from '../../../stores/directivesStore'
import api_district from '../../../api/district'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  name: "EditDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const options = ref([])
    const store_district = directivesStore(api_district)

    console.log(store_district.edit_data)

    const formEdit = ref({
      id: store_district.edit_data.id,
      region: store_district.edit_data.region,
      name: store_district.edit_data.name,
      schema: store_district.edit_data.schema,
      name_aliases: store_district.edit_data.name_aliases.join(', ')
    })

    const editData = async (data) => {
      console.log(data)
      const infoEdit = {
        id: data.id,
        region_id: data.region.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
      }
      const data_for_table = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(','),
        region:{
          id: data.region.id,
          name: data.region.name
        }
      }
      await store_district.editData(infoEdit, data_for_table)
      onDialogOK()
    }

    return{
      options,
      formEdit,

      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      editData,
    }

  }
}
</script>

<style scoped>

</style>
