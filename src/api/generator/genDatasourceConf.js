import { post, get } from '@/utils/request'

/**
 * save
 */
export function genDatasourceConf(data, cb, errHandle) {
  return post('/generator/genDatasourceConf', data, cb, errHandle)
}

/**
 * list
 */
export function list(data, cb, errHandle) {
  return get('/generator/genDatasourceConf/list', data, cb, errHandle)
}

/**
 * getSysDatasourceConfPage
 */
export function page(data, cb, errHandle) {
  return get('/generator/genDatasourceConf/page', data, cb, errHandle)
}

/**
 * getById
 */
export function genDatasourceConfByGet(data, cb, errHandle) {
  return get('/generator/genDatasourceConf/{id}', data, cb, errHandle)
}
