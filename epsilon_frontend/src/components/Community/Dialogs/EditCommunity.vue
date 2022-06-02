<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          label="name"
          v-model="formEdit.name"
        />
        <q-select
          v-model="formEdit.autocomplete"
          use-input
          hide-selected
          :options="district_list"
          fill-input
          input-debounce="500"
          option-value="id"
          option-label="name"
          label="Райони"
          @filter="setFilter"
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
import { useAutocomplete } from '../../../composition/autocomplete'
import api_community from '../../../api/community'
import api_district from '../../../api/district'

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
    const district_list = ref([])
    const store_district = directivesStore(api_district, 'storeDistrict')
    const {autocomplete: custAutocomplete} = useAutocomplete()

    const formEdit = ref({
      id: store_community.edit_data.id,
      district: store_community.edit_data.district,
      name: store_community.edit_data.name,
      schema: store_community.edit_data.schema,
      name_aliases: store_community.edit_data.name_aliases.join(', '),
      autocomplete: store_community.edit_data.district
    })

    const editData = async (data) => {
      const infoEdit = {
        id: data.id,
        name: data.name,
        schema: data.autocomplete.schema,
        district_id: data.autocomplete.id,
        name_aliases: data.name_aliases.split(',')
      }
      const data_for_table = {
        id: data.id,
        name: data.name,
        schema: data.autocomplete.schema,
        name_aliases: data.name_aliases.split(','),
        district:{
          id: data.autocomplete.id,
          name: data.autocomplete.name
        }
      }
      await store_community.editData(infoEdit, data_for_table)
      onDialogOK()
    }

    const setFilter = (data, update) => {
      update(
        custAutocomplete(store_district, data)
          .then(response => {
            district_list.value = response.value
          })
      )
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      formEdit,
      district_list,

      editData,
      setFilter,
    }
  }
}
</script>

<style scoped>

</style>
