<template>
  <h3>Table</h3>
  <p v-for="i in store.data" :key="i.id">
    {{ i }}
  </p>
</template>

<script>
import { directivesStore } from '../stores/directivesStore'

export default {
  name: "Table",
  props:{
    api:{
      required: true
    }
  },
  setup(props){
    const store = directivesStore(props.api)
    Promise.race([store.getData(store.options)]).then(response => {
      store.data = response
    })
    return{
      store
    }
  }
}
</script>

<style scoped>

</style>
