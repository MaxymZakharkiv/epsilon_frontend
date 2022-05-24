import http from '../lib/http'


const DISTRICTS_LIST = "/district/list";
const DISTRICTS_VIEW = "/district/view"
const DISTRICTS_CREATE = "/district/create";
const DISTRICTS_UPDATE = "/district/update";
const DISTRICTS_DELETE = "/district/delete";
const name_api = "district"

function list(options) {
  return http.post(
    DISTRICTS_LIST,
    options
  )
}


function view(options){
  return http.post(
    DISTRICTS_VIEW,
    options
  )
}

function create(object) {
  return http.post(
    DISTRICTS_CREATE,
    object
  )
}

function edit(object) {
  return http.post(
    DISTRICTS_UPDATE,
    object
  )
}

function del(object_id) {
  return http.post(
    DISTRICTS_DELETE,
    object_id
  )
}

export default {
  list,
  view,
  create,
  edit,
  del,
  name_api
}
