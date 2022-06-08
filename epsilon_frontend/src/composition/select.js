import { ref } from 'vue'

export function useSelect(){
  const list_options = ref([])
  const select = async (store, data=null, field_filter) => {
    const info = [{
      field: field_filter,
      operator:'=',
      value: data
    }]
    store.options_data.request.limit = 50
    store.options_data.request.filter_by = info
    try {
      const response = await store.getData(store.options_data)
      list_options.value = response
    } catch (e) {
      console.log(e)
    }
    return list_options
  }
  return{ select, list_options }
}
