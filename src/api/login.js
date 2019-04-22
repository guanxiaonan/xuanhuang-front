import request from '@/utils/request'

export function loginByUsername(data) {
  // const data = JSON.stringify(query)
  return request({
    url: 'http://localhost:9102/user/login',
    method: 'post',
    data
  }) // cl
  // gyn
  // return request({
  //   url: 'http://101.132.44.253/user/login',
  //   method: 'post',
  //   data
  // })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/server/index.php?g=Web&c=Mock&o=simple&projectID=15&uri=getUserInfo',
    method: 'post',
    params: {
      token
    }
  })
}
