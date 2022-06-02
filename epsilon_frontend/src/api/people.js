import http from '../lib/http'


const PEOPLE_LIST = "/people/list";
const PEOPLE_VIEW = "/people/view"
const PEOPLE_CREATE = "/people/create";
const PEOPLE_DELETE = "/people/delete";
const PEOPLE_EDIT = "/people/update";


function list(options) {
  return http.post(
    PEOPLE_LIST,
    options
  )
}

function view(options){
  return http.post(
    PEOPLE_VIEW,
    options
  )
}

function create(objects){
  return http.post(
    PEOPLE_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    PEOPLE_DELETE,
    id
  )
}

function edit(object){
  return http.post(
    PEOPLE_EDIT,
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
