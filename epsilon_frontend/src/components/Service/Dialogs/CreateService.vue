<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        {{ form.schema }}
        <q-input
          label="id"
          v-model="form.id"
        />
        <q-select
          :options="['rivne', 'volyn']"
          label="schema"
          v-model="form.schema"
        />
        <q-input
          label="name"
          v-model="form.name"
        />
        <q-input
          label="name_printable"
          v-model="form.name_printable"
        />
        <q-input
          label="bank"
          v-model="form.bank"
        />
        <q-input
          label="bic"
          v-model="form.bic"
        />
        <q-input
          label="account"
          v-model="form.account"
        />
        <q-input
          label="dimension_unit"
          v-model="form.dimension_unit"
        />
        <q-input
          label="month_difference"
          v-model="form.month_difference"
        />
        <q-checkbox
          label="nonprepaid"
          v-model="form.nonprepaid"
        />
        <q-input
          label="payment_details"
          v-model="form.payment_details"
        />
        <q-checkbox
          label="calculable"
          v-model="form.calculable"
        />
        <br>
        <q-checkbox
          label="db"
          v-model="form.db"
        />
        <br>
        <q-checkbox
          label="online"
          v-model="form.online"
        />
        <br>
        <q-checkbox
          label="disabled"
          v-model="form.disabled"
        />
        <br>
        <q-checkbox
          label="virtual"
          v-model="form.virtual"
        />
        <q-input
          label="virtual_error_array"
          type="textarea"
          v-model="form.virtual_error_array"
        />
        <q-input
          label="acquiring"
          v-model="form.acquiring"
        />
        <q-input
          label="config"
          v-model="form.config"
        />
        <q-input
          label="source"
          v-model="form.source"
        />
        <q-input
          label="localities"
          type="textarea"
          v-model="form.localities"
        />
        <q-input
          label="acl_office"
          type="textarea"
          v-model="form.acl_office"
        />
        <q-select
          v-model="form.organization"
          label="Організація*"
          use-input
          input-debounce="500"
          option-value="id"
          option-label="name"
          :options="organizations_list"
          @filter="filterOrganization"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Дані відсутні
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="addNewData(form)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

import api_organization from '../../../api/organization'
import api_service from '../../../api/service'
import { directivesStore } from '../../../stores/directivesStore'
import { useSelect } from '../../../composition/select'

export default {
  name: "CreateService",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup(){
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const form = ref({
      id: null,
      name: null,
      schema: null,
      name_printable: null,
      bank: null,
      bic: null,
      account: null,
      dimension_unit: null,
      month_difference: null,
      nonprepaid: false,
      payment_details: null,
      calculable: false,
      db: false,
      online: false,
      disabled: false,
      virtual: false,
      virtual_error_array: null,
      acquiring: null,
      config: null,
      source: null,
      localities: null,
      acl_office: null,
      organization: null,
    })

    const {select: custSelect} = useSelect()

    const organizations_list = ref([])

    const store_service = directivesStore(api_service)
    const store_organizations = directivesStore(api_organization, 'storeOrganizations')

    const filterOrganization = (data, update) => {
      update(
        custSelect(store_organizations, form.value.schema, 'schema')
          .then(response => {
            console.log(response.value)
            organizations_list.value = response.value
          })
      )
    }

    const addNewData = async (data) => {
      const infoForRequest ={
        schema: data.schema,
        id: data.id,
        name: data.name,
        name_printable: data.name_printable,
        bank: data.bank,
        bic: data.bic,
        account: data.account,
        dimension_unit: data.dimension_unit,
        month_difference: data.month_difference,
        nonprepaid: data.nonprepaid,
        payment_details: data.payment_details,
        calculable: data.calculable,
        db: data.db,
        online: data.online,
        disabled: data.disabled,
        virtual: data.virtual,
        virtual_error_array: data.virtual_error_array.split(','),
        acquiring: data.acquiring,
        config: data.config,
        source: data.source,
        localities: data.localities.split(','),
        acl_office: data.acl_office.split(','),
        organization_id: data.organization.id
      }
      const infoForTable ={
        schema: data.schema,
        id: data.id,
        name: data.name,
        name_printable: data.name_printable,
        bank: data.bank,
        bic: data.bic,
        account: data.account,
        dimension_unit: data.dimension_unit,
        month_difference: data.month_difference,
        nonprepaid: data.nonprepaid,
        payment_details: data.payment_details,
        calculable: data.calculable,
        db: data.db,
        online: data.online,
        disabled: data.disabled,
        virtual: data.virtual,
        virtual_error_array: data.virtual_error_array.split(','),
        acquiring: data.acquiring,
        config: data.config,
        source: data.source,
        localities: data.localities,
        acl_office: data.acl_office,
        organization: data.organization
      }
      await store_service.createData(infoForRequest, infoForTable)
      onDialogOK()
    }

    return{
      dialogRef,
      onDialogHide,
      onOKClick:onDialogOK,
      onCancelClick: onDialogCancel,

      form,
      organizations_list,

      filterOrganization,
      addNewData
    }
  }
}
</script>

<style scoped>

</style>
