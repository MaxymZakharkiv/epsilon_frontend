import { defineStore } from 'pinia'
import {ref} from "vue";


export function directivesStore(api, store_id="directivesStore"){
  return defineStore(String(store_id), () => {
    let edit_data = ref({})
    let data = ref([])

    let options_data = ref({
      "request": {
        "limit": 10,
        "offset": 0,
        "order_by": [],
        "filter_by": []
      },
      "uselist": true
    })

    const getData = async (options) => {
      try {
        const response = await api.list(options)
        console.log(response)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }

    // const createData = async (objects, extra_data={}) => {
    //   try {
    //     const response = await api.create(objects)
    //     // extra_data['id'] = response.data
    //     data.value.unshift(extra_data)
    //     data.value.pop()
    //   } catch (e) {
    //    console.log(e)
    //   }
    // }
    const createData = async (objects) => {
      try {
        const response = await api.create(objects)
        console.log(response)
        return response
      } catch (e) {
        console.log(e)
      }
    }

    // const editData = async (objects, extra_data={}) => {
    //   const response = await api.edit(objects)
    //   const data_server =  response.data?.id ?? response.data
    //   extra_data['id'] = data_server
    //   let index = data.value.findIndex(obj => obj.id === data_server)
    //   console.log(index)
    //   data.value[index] = extra_data
    // }

    const editData = async (objects) => {
      try{
        const response = await api.edit(objects)
        console.log(response)
        return response
      } catch (e) {
        console.log(e)
      }
    }


    const deleteData = async (id) => {
      const response = await api.del(id)
      console.log(response)
      data.value = data.value.filter(i => i.id !== id)
    }

    return{
      getData,
      createData,
      editData,
      deleteData,


      data,
      edit_data,
      options_data,
    }
  })()
}
