<template>

    <Suspense>
      <template #default>
        <Table
          :title="'Райони'"
          :api="api"
          :columns="columns"
        />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
</template>

<script>
import Table from "components/Table";
import api from '../../api/region'
export default {
  name: "Region",
  components: {
    Table
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
    ]

    return{
      api,
      columns
    }
  }
}
</script>

<style scoped>

</style>
