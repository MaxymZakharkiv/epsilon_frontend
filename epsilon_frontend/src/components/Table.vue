<template>
  <h3>Table</h3>
  <q-table
    :title="title"
    :rows="store.data"
    :columns="columns"
  >
    <template v-slot:body-cell-remove="props">
      <q-td :props="props">
        <q-btn
          color="negative"
          icon-right="delete"
          no-caps
          flat
          dense
        />
      </q-td>
    </template>
    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center text-accent q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span>
            Немає даних
          </span>
        <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
      </div>
    </template>
  </q-table>
</template>

<script>
import { directivesStore } from '../stores/directivesStore'

export default {
  name: "Table",
  props:{
    api:{
      required: true
    },
    columns:{
      required: true
    },
    title:{
      required:true
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
