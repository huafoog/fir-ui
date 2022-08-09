/*
 *    Copyright (c) 2018-2025, fir All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: fir
 */

import { get, post, del, put } from '@/utils/request'

export function fetchList(query) {
  return get('/admin/oauthclientdetails/page', query)
}

export function addObj(obj) {
  return post('/admin/oauthclientdetails', obj)
}

export function getObj(id) {
  return get('/admin/oauthclientdetails/' + id)
}

export function delObj(id) {
  return del('/admin/oauthclientdetails/' + id)
}

export function putObj(obj) {
  return put('/admin/oauthclientdetails', obj)
}
