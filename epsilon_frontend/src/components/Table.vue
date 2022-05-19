<template>
  <q-table
    :title="title"
    :rows="store.data"
    :columns="columns"
    :loading="loading"
    @request="onRequest"
    v-model:pagination="pagination"
    @row-dblclick="editRow"
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
import { ref, computed } from 'vue'

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

    let options = ref({
      "request": {
        "limit": 10,
        "offset": 0,
        "order_by": [],
        "filter_by": []
      },
      "uselist": true
    })

    const loading = ref(false)
    const sortData = ref([])

    const store = directivesStore(props.api)
    const disableNextButton = ref(false)


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

      options.value.request.limit = rowsPerPage
      options.value.request.order_by = sortData.value
      options.value.request.offset = 0

      await Promise.race([store.getData(options.value)]).then(response => {
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

    const disablePrevButton = computed(() => {
      return options.value.request.offset === 0 ? true : false
    })

    const previousPage = async () => {
      disableNextButton.value = false
      options.value.request.offset -= options.value.request.limit
      loading.value = true
      await Promise.race([store.getData(options.value)]).then(response => {
        store.data = response
      })
      loading.value = false
    }

    const nextPage = async () => {
      options.value.request.offset += options.value.request.limit
      loading.value = true
      await Promise.race([store.getData(options.value)]).then(response => {
        if (response.length === 0){
          disableNextButton.value = true
          options.value.request.offset -= options.value.request.limit
        } else {
          store.data = response
        }
      })
      loading.value = false
    }

    const editRow = (evt, row) => {
      store.edit_data = row
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
      options,
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
