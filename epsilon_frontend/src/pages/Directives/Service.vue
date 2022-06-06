<template>
 <Suspense>
   <template #default>
     <Table
      :title="'Послуги'"
      :api="api_service"
      :columns="columns"
      @addNewElement="addNewElement"
      @editElement="editElement"
      @deleteElement="deleteElement"
     />
   </template>
   <template #fallback>
     <Skeleton/>
   </template>
 </Suspense>
</template>

<script>

import Table from "components/Table";
import Skeleton from "components/Skeleton";
import CreateService from "components/Service/Dialogs/CreateService";
import EditService from "components/Service/Dialogs/EditService";

import api_service from '../../api/service'
import { directivesStore } from '../../stores/directivesStore'
import { useQuasar } from "quasar";

export default {
  name: "Service",
  components:{
    Table,
    Skeleton
  },
  setup(){

    const columns = [
      {
        name:'id',
        label:'id',
        align:'left',
        sortable:true,
        field: row => row.id,
        format:val => `${val}`
      },
      {
        name:'name',
        label:'name',
        align:'left',
        sortable:true,
        field: row => row.name,
        format:val => `${val}`
      },
      {
        name:'name_printable',
        label:'name_printable',
        align:'left',
        sortable:true,
        field: row => row.name_printable,
        format:val => `${val}`
      },
      {
        name:'schema',
        label:'schema',
        align:'left',
        sortable:true,
        field: row => row.schema,
        format:val => `${val}`
      },
      {
        name:'schema',
        label:'schema',
        align:'left',
        sortable:true,
        field: row => row.schema,
        format:val => `${val}`
      },
      {
        name:'bank',
        label:'bank',
        align:'left',
        sortable:true,
        field: row => row.bank,
        format:val => `${val}`
      },
      {
        name:'bic',
        label:'bic',
        align:'left',
        sortable:true,
        field: row => row.bic,
        format:val => `${val}`
      },
      {
        name:'account',
        label:'account',
        align:'left',
        sortable:true,
        field: row => row.account,
        format:val => `${val}`
      },
      {
        name:'dimension_unit',
        label:'dimension_unit',
        align:'left',
        sortable:true,
        field: row => row.dimension_unit,
        format:val => `${val}`
      },
      {
        name:'month_difference',
        label:'month_difference',
        align:'left',
        sortable:true,
        field: row => row.month_difference,
        format:val => `${val}`
      },
      {
        name:'nonprepaid',
        label:'nonprepaid',
        align:'left',
        sortable:true,
        field: row => row.nonprepaid,
        format:val => `${val}`
      },
      {
        name:'payment_details',
        label:'payment_details',
        align:'left',
        sortable:true,
        field: row => row.payment_details,
        format:val => `${val}`
      },
      {
        name:'db',
        label:'db',
        align:'left',
        sortable:true,
        field: row => row.db,
        format:val => `${val}`
      },
      {
        name:'online',
        label:'online',
        align:'left',
        sortable:true,
        field: row => row.online,
        format:val => `${val}`
      },
      {
        name:'disabled',
        label:'disabled',
        align:'left',
        sortable:true,
        field: row => row.disabled,
        format:val => `${val}`
      },
      {
        name:'virtual',
        label:'virtual',
        align:'left',
        sortable:true,
        field: row => row.virtual,
        format:val => `${val}`
      },
      {
        name:'virtual_error_array',
        label:'virtual_error_array',
        align:'left',
        sortable:true,
        field: row => row.virtual_error_array,
        format:val => `${val}`
      },{
        name:'acquiring',
        label:'acquiring',
        align:'left',
        sortable:true,
        field: row => row.acquiring,
        format:val => `${val}`
      },{
        name:'config',
        label:'config',
        align:'left',
        sortable:true,
        field: row => row.config,
        format:val => `${val}`
      },
      {
        name:'source',
        label:'source',
        align:'left',
        sortable:true,
        field: row => row.source,
        format:val => `${val}`
      },
      {
        name:'localities',
        label:'localities',
        align:'left',
        sortable:true,
        field: row => row.localities,
        format:val => `${val}`
      },
      {
        name:'acl_offices',
        label:'acl_offices',
        align:'left',
        sortable:true,
        field: row => row.acl_offices,
        format:val => `${val}`
      },
      {
        name:'organization',
        label:'organization',
        align:'left',
        sortable:true,
        field: row => row.organization?.name ?? row.organization,
        format:val => `${val}`
      },
      {
        name:'remove',
        label:'remove',
        align:'left'
      },
      {
        name:'edit',
        label:'edit',
        align:'left'
      }
    ]
    const $q = useQuasar()
    const service_store = directivesStore(api_service)

    const addNewElement = () => {
      $q.dialog({
        component: CreateService
      })
    }

    const editElement = () => {
      $q.dialog({
        component: EditService
      })
    }

    const deleteElement = (id) => {
      service_store.deleteData(id)
    }


    return{
      api_service,

      columns,

      addNewElement,
      deleteElement,
      editElement
    }
  }
}
</script>

<style scoped>

</style>
