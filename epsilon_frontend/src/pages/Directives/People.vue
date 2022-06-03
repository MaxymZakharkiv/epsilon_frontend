<template>
  <Suspense>
    <template #default>
      <Table
        :title="'Люди'"
        :api="api_people"
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
import CreatePeople from "components/People/Dialogs/CreatePeople";
import EditPeople from "components/People/Dialogs/EditPeople";

import api_people from '../../api/people'
import { directivesStore } from '../../stores/directivesStore'

import { useQuasar } from 'quasar'

export default {
  name: "People",
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
        name:'schema',
        label:'schema',
        align:'left',
        sortable:true,
        field: row => row.schema,
        format:val => `${val}`
      },
      {
        name:'building',
        label:'building',
        align:'left',
        sortable:true,
        field: row => row.building,
        format:val => `${val}`
      },
      {
        name:'building_suffix',
        label:'building_suffix',
        align:'left',
        sortable:true,
        field: row => row.building_suffix,
        format:val => `${val}`
      },
      {
        name:'corpus',
        label:'corpus',
        align:'left',
        sortable:true,
        field: row => row.corpus,
        format:val => `${val}`
      },
      {
        name:'apartment',
        label:'apartment',
        align:'left',
        sortable:true,
        field: row => row.apartment,
        format:val => `${val}`
      },
      {
        name:'apartment_suffix',
        label:'apartment_suffix',
        align:'left',
        sortable:true,
        field: row => row.apartment_suffix,
        format:val => `${val}`
      },
      {
        name:'block',
        label:'block',
        align:'left',
        sortable:true,
        field: row => row.block,
        format:val => `${val}`
      },
      {
        name:'last_name',
        label:'last_name',
        align:'left',
        sortable:true,
        field: row => row.last_name,
        format:val => `${val}`
      },
      {
        name:'first_name',
        label:'first_name',
        align:'left',
        sortable:true,
        field: row => row.first_name,
        format:val => `${val}`
      },
      {
        name:'middle_name',
        label:'middle_name',
        align:'left',
        sortable:true,
        field: row => row.middle_name,
        format:val => `${val}`
      },
      {
        name:'inpp',
        label:'inpp',
        align:'left',
        sortable:true,
        field: row => row.inpp,
        format:val => `${val}`
      },
      {
        name:'hd',
        label:'hd',
        align:'left',
        sortable:true,
        field: row => row.hd,
        format:val => `${val}`
      },
      {
        name:'residents',
        label:'residents',
        align:'left',
        sortable:true,
        field: row => row.residents,
        format:val => `${val}`
      },
      {
        name:'space',
        label:'space',
        align:'left',
        sortable:true,
        field: row => row.space,
        format:val => `${val}`
      },
      {
        name:'rooms',
        label:'rooms',
        align:'left',
        sortable:true,
        field: row => row.rooms,
        format:val => `${val}`
      },
      {
        name:'privilege',
        label:'privilege',
        align:'left',
        sortable:true,
        field: row => row.privilege,
        format:val => `${val}`
      },
      {
        name:'comment',
        label:'comment',
        align:'left',
        sortable:true,
        field: row => row.comment,
        format:val => `${val}`
      },
      {
        name:'city',
        label:'city',
        align:'left',
        sortable:true,
        field: row => row.city.name,
        format:val => `${val}`
      },
      {
        name:'street',
        label:'street',
        align:'left',
        sortable:true,
        field: row => row.street.name,
        format:val => `${val}`
      },
      {
        name:'secret_id',
        label:'secret_id',
        align:'left',
        sortable:true,
        field: row => row.secret_id,
        format:val => `${val}`
      },
      {
        name:'secret_id_short',
        label:'secret_id_short',
        align:'left',
        sortable:true,
        field: row => row.secret_id_short,
        format:val => `${val}`
      },
      {
        name:'gender',
        label:'gender',
        align:'left',
        sortable:true,
        field: row => row.gender,
        format:val => `${val}`
      },
      {
        name:'birthday',
        label:'birthday',
        align:'left',
        sortable:true,
        field: row => row.birthday,
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
    const people_store = directivesStore(api_people)

    const addNewElement = () => {
      $q.dialog({
        component: CreatePeople
      })
    }

    const editElement = () => {
      $q.dialog({
        component: EditPeople
      })
    }

    const deleteElement = (id) => {
      people_store.deleteData(id)
    }

    return{
      api_people,

      columns,

      addNewElement,
      editElement,
      deleteElement
    }
  }
}
</script>

<style scoped>

</style>
