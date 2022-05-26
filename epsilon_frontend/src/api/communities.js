import http from '../lib/http'


const COMMUNITIES_LIST = "/community/list";
const COMMUNITIES_VIEW = "/community/view"
const COMMUNITIES_CREATE = "/community/create";
const COMMUNITIES_DELETE = "/community/delete";
const COMMUNITIES_EDIT = "/community/update";



function list(options) {
  return http.post(
    COMMUNITIES_LIST,
    options
  )
}

function view(options){
  return http.post(
    COMMUNITIES_VIEW,
    options
  )
}

function create(objects){
  return http.post(
    COMMUNITIES_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    COMMUNITIES_DELETE,
    id
  )
}

function edit(object){
  return http.post(
    COMMUNITIES_EDIT,
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
