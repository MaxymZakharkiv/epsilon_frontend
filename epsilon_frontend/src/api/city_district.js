import http from '../lib/http'


const CITY_DISTRICT_LIST = "/city_district/list";
const CITY_DISTRICT_VIEW = "/city_district/view"
const CITY_DISTRICT_CREATE = "/city_district/create";
const CITY_DISTRICT_DELETE = "/city_district/delete";
const CITY_DISTRICT_EDIT = "/city_district/update";



function list(options) {
  return http.post(
    CITY_DISTRICT_LIST,
    options
  )
}

function view(options){
  return http.post(
    CITY_DISTRICT_VIEW,
    options
  )
}

function create(objects){
  return http.post(
    CITY_DISTRICT_CREATE,
    objects
  )
}

function del(id){
  return http.post(
    CITY_DISTRICT_DELETE,
    id
  )
}

function edit(object){
  return http.post(
    CITY_DISTRICT_EDIT,
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
