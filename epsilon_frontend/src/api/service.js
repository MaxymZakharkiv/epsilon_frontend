import http from "../lib/http";


const SERVICE_LIST = "/service/list";
const SERVICE_CREATE = "/service/create";
const SERVICE_DELETE = "/service/delete";
const SERVICE_EDIT = "/service/update";

function list(options) {
  return http.post(
    SERVICE_LIST,
    options
  )
}

function create(objects){
  return http.post(
    SERVICE_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    SERVICE_DELETE,
    id
  )
}

function edit(object){
  return http.post(
    SERVICE_EDIT,
    object
  )
}

export default {
  list,
  create,
  del,
  edit,
}
