import http from '../lib/http'


const STREET_LIST = "/street/list";
const STREET_VIEW = "/street/view"
const STREET_CREATE = "/street/create";
const STREET_DELETE = "/street/delete";
const STREET_EDIT = "/street/update";



function list(options) {
  return http.post(
    STREET_LIST,
    options
  )
}

function view(options){
  return http.post(
    STREET_VIEW,
    options
  )
}

function create(objects){
  return http.post(
    STREET_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    STREET_DELETE,
    id
  )
}


function edit(object){
  return http.post(
    STREET_EDIT,
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
