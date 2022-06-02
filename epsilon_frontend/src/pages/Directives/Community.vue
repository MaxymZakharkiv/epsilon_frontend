<template>
  <Suspense>
    <template #default>
      <Table
        :title="'Громади'"
        :api="api_communities"
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
import CreateCommunity from "components/Community/Dialogs/CreateCommunity";
import EditCommunity from "components/Community/Dialogs/EditCommunity";
import Skeleton from "components/Skeleton";
import api_communities from '../../api/community'
import { directivesStore } from '../../stores/directivesStore'

import { useQuasar } from "quasar";

export default {
  name: "Communities",
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
        name:'district',
        label:'district',
        align:'left',
        sortable:false,
        field: row => row.district.name,
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
    const store_community = directivesStore(api_communities)

    const addNewElement = () => {
      $q.dialog({
        component: CreateCommunity
      })
    }

    const editElement = () => {
      $q.dialog({
        component: EditCommunity
      })
    }

    const deleteElement = (id) => {
      store_community.deleteData(id)
    }

    return{
      columns,

      api_communities,

      addNewElement,
      editElement,
      deleteElement,
    }
  }
}
</script>

<style scoped>

</style>
