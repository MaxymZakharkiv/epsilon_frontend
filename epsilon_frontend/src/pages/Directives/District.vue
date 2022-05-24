<template>
  <FilterData :api="api_district" :field="field" />
  <Suspense>
    <template #default>
      <Table
        :title="'Райони'"
        :columns="columns"
        :api="api_district"
        @addNewElement="addNewElement"
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
import CreateDistrict from "components/Distict/Dialogs/CreateDistrict";
import FilterData from "components/FilterData";
import api_district from '../../api/district'
import {directivesStore} from "stores/directivesStore";

import { useQuasar } from "quasar";

export default {
  name: "District",
  components:{
    Table,
    Skeleton,
    FilterData
  },
  setup(){
    const field = ['id', 'name', 'schema', 'schema_id']
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
        name:'region_id',
        label:'region_id',
        align:'left',
        sortable:true,
        field: row => row.region.name,
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
    ]
    const $q = useQuasar()
    const store = directivesStore(api_district)


    const addNewElement = () => {
      $q.dialog({
        component:CreateDistrict,
      })
    }

    return{
      columns,
      field,
      api_district,

      addNewElement
    }
  }
}
</script>

<style scoped>

</style>
