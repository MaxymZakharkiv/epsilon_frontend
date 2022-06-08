<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          v-model="v$.name.$model"
          label="name"
          :error="v$.name.$error"
        />
        <span v-for="i in v$.name.$errors" :key="i" class="text-red-10">
          {{ i.$message }}
        </span>
        <q-input
          v-model="v$.schema.$model"
          label="schema"
          :error="v$.schema.$error"
        />
        <span v-for="i in v$.schema.$errors" :key="i" class="text-red-10">
          {{ i.$message }}
        </span>
        <q-input
          type="textarea"
          v-model="v$.name_aliases.$model"
          label="alias"
          :error="v$.name_aliases.$error"
        />
        <span v-for="i in v$.name_aliases.$errors" :key="i" class="text-red-10">
          {{ i.$message }}
        </span>
<!--        <q-input v-model="formEdit.name" label="name" />-->
<!--        <q-input v-model="formEdit.schema" label="schema" />-->
<!--        <q-input type="textarea" v-model="formEdit.name_aliases" label="alias" />-->
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

import {useDialogPluginComponent, useQuasar} from 'quasar'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import {helpers, required} from '@vuelidate/validators'


export default {
  name: "EditRegion",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const region_store = directivesStore(api)

    const formEdit = ref({
      id: region_store.edit_data.id,
      name: region_store.edit_data.name,
      schema: region_store.edit_data.schema,
      name_aliases: region_store.edit_data.name_aliases.join(', ')
    })

    const rules = {
      name: {
        required: helpers.withMessage("Поле обов'язкове", required)
      },
      schema: {
        required: helpers.withMessage("Поле обов'язкове", required)
      },
      name_aliases: {
        required: helpers.withMessage("Поле обов'язкове", required)
      }
    }

    const $q = useQuasar()
    const v$ = useVuelidate(rules, formEdit)

    const editData = async (data) => {

      if (v$.value.$errors.length){
        $q.notify({
          type:'negative',
          message: 'Коректно введіть дані'
        })
        return
      }

      const infoEdit = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(', ')
      }

      const response = await region_store.editData(infoEdit)

      const extra_data = {
        id: data.id,
        name: data.name,
        schema: data.schema,
        name_aliases: data.name_aliases.split(', ')
      }

      let index = region_store.data.findIndex(obj => obj.id === response.data.id)
      region_store.data[index] = extra_data
      onDialogOK()
    }

    return{
      formEdit,
      v$,

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
