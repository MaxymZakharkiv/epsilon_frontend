<template>
  <Suspense>
    <template #default>
      <Table
        :title="'Вулиці'"
        :api="api_street"
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
import CreateStreet from "components/Street/Dialogs/CreateStreet";
import EditStreet from "components/Street/Dialogs/EditStreet";

import { useQuasar } from 'quasar'

import { directivesStore } from '../../stores/directivesStore'
import api_street from '../../api/street'

export default {
  name: "Streets",
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
        name:'city',
        label:'city',
        align:'left',
        sortable:false,
        field: row => row.city?.name ?? null,
        format:val => `${val}`
      },
      {
        name:'city_district',
        label:'city_district',
        align:'left',
        sortable:false,
        field: row => row.city_district?.name ?? null,
        format:val => `${val}`
      },
      {
        name:'type',
        label:'type',
        align:'left',
        sortable:true,
        field: row => row.type?.id ?? row.type,
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
    const $q = useQuasar()
    const street_store = directivesStore(api_street)

    const addNewElement = () => {
      $q.dialog({
        component: CreateStreet
      })
    }

    const editElement = () => {
      $q.dialog({
        component: EditStreet
      })
    }

    const deleteElement = (id) => {
      street_store.deleteData(id)
    }

    return{
      api_street,

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
