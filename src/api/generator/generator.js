import { post, get } from '@/utils/request'

/**
 * generatorCode
 */
export function code(data, cb, errHandle) {
  return post('/generator/generator/code', data, cb, errHandle)
}

/**
 * generatorDoc
 */
export function doc(data, cb, errHandle) {
  return get('/generator/generator/doc', data, cb, errHandle)
}

/**
 * getPage
 */
export function page(data, cb, errHandle) {
  return get('/generator/generator/page', data, cb, errHandle)
}

/**
 * previewCode
 */
export function preview(data, config, cb, errHandle) {
  return get('/generator/generator/preview', data, config, cb, errHandle)
}

/**
 * getTable
 */
export function table(data, cb, config, errHandle) {
  return get('/generator/generator/table', data, config, cb, errHandle)
}
