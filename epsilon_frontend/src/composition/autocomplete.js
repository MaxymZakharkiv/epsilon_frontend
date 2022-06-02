import { ref } from 'vue'

export function useAutocomplete(){
  const list_options = ref([])
  const autocomplete = async (store, data=null) => {
    const info = [{
      field:'name',
      operator:'like',
      value: data+'%'
    }]
    store.options_data.request.filter_by = info
    await Promise.race([store.getData(store.options_data)]).then(response => {
      list_options.value = response
    })
    return list_options
  }
  return{ autocomplete, list_options }
}
