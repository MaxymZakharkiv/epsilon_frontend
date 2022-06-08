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
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent, useQuasar } from 'quasar'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

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
      name: null,
      schema: null,
      name_aliases: ''
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
    const v$ = useVuelidate(rules, form)

    const region_store = directivesStore(api)


    const addNewData = async () => {

      if (v$.value.$errors.length || !v$.value.$dirty){
        $q.notify({
          type:'negative',
          message: 'Коректно введіть дані'
        })
        return
      }

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
      v$,

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
