import request from '@/utils/request'
export function getShopCountDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getShopCountDetail',
    method: 'post',
    data
  })
}

export function getDeliverySO(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getDeliverySO',
    method: 'post',
    data
  })
}
