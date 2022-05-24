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
          input-debounce="2000"
          :options="options"
          option-value="id"
          option-label="name"
          label="Регіони"
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

import { directivesStore } from '../../../stores/directivesStore'
import api_region from '../../../api/region'
import api_district from '../../../api/district'

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

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

    const store_region = directivesStore(api_region)
    console.log(store_region.return_name_api())
    console.log(store_region)
    const setFilter = (data, update) => {
      // update(async () => {
      //   store_region.options_data.request.filter_by = []
      //   const info = {
      //     field:'name',
      //     operator:'like',
      //     value: data+'%'
      //   }
      //   store_region.options_data.request.filter_by.push(info)
      //   await Promise.race([store_region.getData(store_region.options_data)]).then(response => {
      //     console.log(response)
      //   })
      // })
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
