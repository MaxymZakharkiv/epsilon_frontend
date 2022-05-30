<template>
  <Suspense>
    <template #default>
      <Table
        :title="'Міста'"
        :columns="columns"
        :api="api_city"
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

import api_city from '../../api/city'
import { directivesStore } from '../../stores/directivesStore'

import CreateCity from "components/City/Dialogs/CreateCity";
import EditCity from "components/City/Dialogs/EditCity";
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
    const store_city = directivesStore(api_city)
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
        sortable:false,
        field: row => row.district,
        format:val => `${val}`
      },
      {
        name:'community',
        label:'community',
        align:'left',
        sortable:false,
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

    const editElement = () => {
      $q.dialog({
        component: EditCity
      })
    }

    const deleteElement = (id) => {
      store_city.deleteData(id)
    }

    return{
      api_city,

      addNewElement,
      editElement,
      deleteElement,

      columns
    }
  }
}
</script>

<style scoped>

</style>
