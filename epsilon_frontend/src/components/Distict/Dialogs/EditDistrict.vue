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
        <q-select
          v-model="v$.autocomplete.$model"
          :error="v$.autocomplete.$error"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="region_list"
          option-value="id"
          option-label="name"
          label="Регіони"
          @filter="setFilter"
          clearable
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Дані відсутні
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <span v-for="i in v$.autocomplete.$errors" :key="i" class="text-red-10">
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
        <q-btn color="primary" label="OK" @click="editData(formEdit)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { directivesStore } from '../../../stores/directivesStore'
import { useAutocomplete } from '../../../composition/autocomplete'
import api_district from '../../../api/district'
import api_region from '../../../api/region'

import { useDialogPluginComponent, useQuasar } from 'quasar'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  name: "EditDistrict",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const store_district = directivesStore(api_district)
    const store_region = directivesStore(api_region, 'regionStore')
    const {autocomplete: custAutocomplete} = useAutocomplete()

    const region_list = ref([])

    console.log(store_district.edit_data)

    const formEdit = ref({
      id: store_district.edit_data.id,
      region: store_district.edit_data.region,
      name: store_district.edit_data.name,
      schema: store_district.edit_data.schema,
      name_aliases: store_district.edit_data.name_aliases.join(', '),
      autocomplete: store_district.edit_data.region
    })



    const rules = {
      name: {
        required: helpers.withMessage("Поле обов'язкове", required)
      },
      autocomplete: {
        required: helpers.withMessage("Поле обов'язкове", required)
      },
      name_aliases: {
        required: helpers.withMessage("Поле обов'язкове", required)
      }
    }

    const $q = useQuasar()
    const v$ = useVuelidate(rules, formEdit)


    const setFilter = (data, update) => {
      update(
        custAutocomplete(store_region, data)
          .then(response => {
            region_list.value = response.value
          })
      )
    }

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
        schema: data.autocomplete?.schema ?? data.schema,
        name_aliases: data.name_aliases.split(','),
        region_id: data.autocomplete.id
      }

      const response = await store_district.editData(infoEdit)

      const data_for_table = {
        id: data.id,
        name: data.name,
        schema: data.autocomplete?.schema ?? data.schema,
        name_aliases: data.name_aliases.split(','),
        region:{
          id: data.autocomplete.id,
          name: data.autocomplete.name
        }
      }

      let index = store_district.data.findIndex(obj => obj.id === response.data.id)
      store_district.data[index] = data_for_table
      onDialogOK()
    }

    return{
      region_list,
      formEdit,
      v$,

      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      editData,
      setFilter,
    }

  }
}
</script>

<style scoped>

</style>
