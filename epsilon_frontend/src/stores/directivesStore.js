import { defineStore } from 'pinia'
import {ref} from "vue";


// export const directivesStore = defineStore('directivesStore', (api) => {
//  console.log(api)
// })

export function directivesStore(api){
  return defineStore('directivesStore', () => {
    let options = ref({
      "request": {
        "limit": 50,
        "offset": 0,
        "order_by": [],
        "filter_by": []
      },
      "uselist": true
    })

    let data = ref([])

    const getData = async (options) => {
      try {
        const response = await api.list(options)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }

    return{
      getData,

      options,
      data
    }
  })()
}
