import { ref } from 'vue'

export function useSelect(){
  const list_options = ref([])
  const select = async (store, data=null, field_filter) => {
    const info = [{
      field: field_filter,
      operator:'=',
      value: data
    }]
    console.log(info)
    store.options_data.request.limit = 50
    store.options_data.request.filter_by = info
    await Promise.race([store.getData(store.options_data)]).then(response => {
      list_options.value = response
    })
    return list_options
  }
  return{ select, list_options }
}
