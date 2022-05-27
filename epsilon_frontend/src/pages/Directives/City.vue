<template>
  <Suspense>
    <template #default>
      <Table
        :title="'Міста'"
        :columns="columns"
        :api="api_city"
        @addNewElement="addNewElement"
      />
    </template>
    <template #fallback>
      <Skeleton/>
    </template>
  </Suspense>
</template>

<script>

import api_city from '../../api/city'

import CreateCity from "components/City/Dialogs/CreateCity";
import Table from "components/Table";
import Skeleton from "components/Skeleton";

import {useQuasar} from "quasar";

export default {
  name: "City",
  components:{
    Table,
    Skeleton
  },
  setup(){

    const $q = useQuasar()
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
        name:'schema',
        label:'schema',
        align:'left',
        sortable:true,
        field: row => row.schema,
        format:val => `${val}`
      },
      {
        name:'name_aliases',
        label:'name_aliases',
        align:'left',
        sortable:true,
        field: row => row.name_aliases,
        format: (val) => val.join(', ')
      },
      {
        name:'district',
        label:'district',
        align:'left',
        sortable:true,
        field: row => row.district.name,
        format:val => `${val}`
      },
      {
        name:'community',
        label:'community',
        align:'left',
        sortable:true,
        field: row => row.community,
        format:val => `${val}`
      },
      {
        name:'type',
        label:'type',
        align:'left',
        sortable:true,
        field: row => row.type,
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
      },
    ]

    const addNewElement = () => {
      $q.dialog({
        component: CreateCity
      })
    }

    return{
      api_city,

      addNewElement,

      columns
    }
  }
}
</script>

<style scoped>

</style>
