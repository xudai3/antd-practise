import request from '@/utils/request';
import { TableListParams } from './data.d';

// export async function queryRule(params: TableListParams) {
//   return request('http://localhost:5000/api/v1/devices', {
//     params,
//   });
// }
export async function queryRule(params: TableListParams) {
  return request('/api/v1/devices', {
    params,
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
