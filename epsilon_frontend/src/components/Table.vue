<template>
  <q-table
    :title="title"
    :rows="store.data"
    :columns="columns"
    :loading="loading"
    @request="onRequest"
    v-model:pagination="pagination"

  >
    <template v-slot:top-right>
      <q-btn @click="addNewData" rounded color="primary" icon-right="add">Додати</q-btn>
    </template>
    <template v-slot:body-cell-remove="props">
      <q-td :props="props">
        <q-btn
          color="negative"
          icon-right="delete"
          no-caps
          flat
          dense
          @click="deleteRow(props.row.id)"
        />
      </q-td>
      <q-td :props="props">
        <q-btn
          color="teal-9"
          icon-right="mdi-pencil"
          no-caps
          flat
          dense
          @click="editRow(props.row)"
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
    <template v-slot:pagination>
      <q-btn
        icon="chevron_left"
        dense
        flat
        @click="previousPage"
        :disable="disablePrevButton"
      />
      <q-btn
        icon="chevron_right"
        dense
        flat
        @click="nextPage"
        :disable="disableNextButton"
      />
    </template>
  </q-table>
</template>

<script>

import { directivesStore } from '../stores/directivesStore'
import { ref, watch } from 'vue'

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
  async setup(props, { emit }){

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10
    })


    const loading = ref(false)
    const sortData = ref([])

    const store = directivesStore(props.api)
    const disableNextButton = ref(false)
    const disablePrevButton = ref(true)


    const onRequest = async (value) => {
      loading.value = true
      const {page, rowsPerPage, sortBy, descending} = value.pagination
      const dictSort = {
        field: sortBy,
      }
      dictSort['order'] = descending ? 'desc' : 'asc'
      const isExistElementInArray = sortData.value.some(element => element['field'] === sortBy ? true : false)
      if (isExistElementInArray) {
        sortData.value = sortData.value.filter(e => e['field'] !== dictSort['field'])
      }

      sortData.value.unshift(dictSort)
      sortData.value = sortData.value.filter(i => {
        return i['field'] !== 'desc'
      })


      store.options_data.request.limit = rowsPerPage
      store.options_data.request.order_by = sortData.value
      store.options_data.request.offset = 0

      await Promise.race([store.getData(store.options_data)]).then(response => {
        store.data = response
      })

      loading.value = false
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    }

    await onRequest({
      pagination: pagination.value
    })


    watch(store.options_data, value => {
      disablePrevButton.value = value.request.offset === 0 ? true : false
    }, {deep:true})


    const previousPage = async () => {
      disableNextButton.value = false
      store.options_data.request.offset -= store.options_data.request.limit
      loading.value = true
      await Promise.race([store.getData(store.options_data)]).then(response => {
        store.data = response
      })
      loading.value = false
    }

    const nextPage = async () => {
      store.options_data.request.offset += store.options_data.request.limit
      loading.value = true
      await Promise.race([store.getData(store.options_data)]).then(response => {
        if (response.length === 0){
          disableNextButton.value = true
          store.options_data.request.offset -= store.options_data.request.limit
        } else {
          store.data = response
        }
      })
      loading.value = false
    }

    const editRow = (data) => {
      store.edit_data = data
      emit('editElement')
    }

    const addNewData = () => {
      emit('addNewElement')
    }

    const deleteRow = (id) => {
      emit('deleteElement', id)
    }

    return{
      store,
      pagination,
      loading,
      disablePrevButton,
      disableNextButton,

      previousPage,
      nextPage,
      onRequest,
      addNewData,
      editRow,
      deleteRow,
    }
  }
}
</script>

<style scoped>

</style>
