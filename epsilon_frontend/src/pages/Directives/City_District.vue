<template>
  <Suspense>
    <template #default>
      <Table
        :title="'Райони міста'"
        :api="api_city_district"
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
import CreateCityDistrict from "components/City_District/Dialogs/CreateCityDistrict";
import EditCityDistrict from "components/City_District/Dialogs/EditCityDistrict";

import api_city_district from '../../api/city_district'
import { directivesStore } from '../../stores/directivesStore'

import { useQuasar } from 'quasar'

export default {
  name: "City_Districts",
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
        name:'city',
        label:'city',
        align:'left',
        sortable:false,
        field: row => row.city.name,
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
    const city_district_store = directivesStore(api_city_district)

    const addNewElement = () => {
      $q.dialog({
        component: CreateCityDistrict
      })
    }

    const editElement = () => {
      $q.dialog({
        component: EditCityDistrict
      })
    }

    const deleteElement = (id) => {
      city_district_store.deleteData(id)
    }

    return{
      addNewElement,
      editElement,
      deleteElement,

      api_city_district,

      columns
    }
  }
}
</script>

<style scoped>

</style>
