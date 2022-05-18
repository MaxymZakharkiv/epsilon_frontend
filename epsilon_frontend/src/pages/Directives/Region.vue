<template>
  <Table :api="api"/>
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
    return{
      api
    }
  }
}
</script>

<style scoped>

</style>
