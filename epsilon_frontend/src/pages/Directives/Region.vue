<template>
  <FilterData :api="api" :field="field" />
    <Suspense>
      <template #default>
        <Table
          :title="'Райони'"
          :api="api"
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
import CreateRegion from "components/Region/Dialogs/CreateRegion";
import EditRegion from "components/Region/Dialogs/EditRegion";
import FilterData from "components/FilterData";

import api from '../../api/region';
import { directivesStore } from '../../stores/directivesStore'
import { useQuasar } from 'quasar'

const field = ['id', 'name', 'schema']
export default {
  name: "Region",
  components: {
    Table,
    Skeleton,
    FilterData
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
        name:'schema',
        label:'schema',
        align:'left',
        sortable:true,
        field: row => row.schema,
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
        name:'name_aliases',
        label:'name_aliases',
        align:'left',
        sortable:true,
        field: row => row.name_aliases,
        format: (val) => val.join(', ')
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
    const store = directivesStore(api)

    const addNewElement = () => {
      $q.dialog({
        component: CreateRegion
      })
    }

    const editElement = () => {
      $q.dialog({
        component:EditRegion
      })
    }

    const deleteElement = (id) => {
      store.deleteData(id)
    }

    return{
      api,
      columns,
      field,

      addNewElement,
      editElement,
      deleteElement
    }
  }
}
</script>

<style scoped>

</style>
