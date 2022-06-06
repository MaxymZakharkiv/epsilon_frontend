import http from '../lib/http'


const ORGANIZATION_LIST = "/organization/list";


function list(options) {
  return http.post(
    ORGANIZATION_LIST,
    options
  )
}


export default {
  list,
}
