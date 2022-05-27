import http from '../lib/http'


const CITY_LIST = "/city/list";
const CITY_VIEW = "/city/view"
const CITY_CREATE = "/city/create";
const CITY_DELETE = "/city/delete";
const CITY_EDIT = "/city/update";



function list(options) {
  return http.post(
    CITY_LIST,
    options
  )
}

function view(options){
  return http.post(
    CITY_VIEW,
    options
  )
}

function create(objects){
  return http.post(
    CITY_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    CITY_DELETE,
    id
  )
}

function edit(object){
  return http.post(
    CITY_EDIT,
    object
  )
}

export default {
  list,
  create,
  del,
  edit,
  view,
}
