import { defineStore } from 'pinia'
import {ref} from "vue";


export function directivesStore(api){
  return defineStore('directivesStore', () => {

    let edit_data = ref({})
    let data = ref([])

    const getData = async (options) => {
      try {
        const response = await api.list(options)
        console.log(response)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }

    const createData = async (objects) => {
      try {
        const response = await api.create(objects)
        data.value.unshift(response.data)
      } catch (e) {
       console.log(e)
      }
    }

    const editData = async (objects) => {
      const response = await api.edit(objects)
      let index = data.value.findIndex(obj => obj.id === objects.id)
      data.value[index] = response.data
    }

    const deleteData = async (id) => {
      const response = await api.del(id)
      data.value = data.value.filter(i => i.id !== id)
    }

    return{
      getData,
      createData,
      editData,
      deleteData,

      data,
      edit_data
    }
  })()
}
