import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/getProductList',
    method: 'post',
    data
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: {
      pv
    }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function modifyUserPassword(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/modifyUserPassword',
    method: 'post',
    data
  })
}

export function setTradeConfig(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/setTradeConfig',
    method: 'post',
    data
  })
}

export function getTradeConfig(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/getTradeConfig',
    method: 'post',
    data
  })
}

export function getMemberList(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/getMemberList',
    method: 'post',
    data
  })
}

export function addShopDetail(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/addShopDetail',
    method: 'post',
    data
  })
}

export function queryShopList(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/queryShopList',
    method: 'post',
    data
  })
}

export function getShopDetailInfo(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/getShopDetailInfo',
    method: 'post',
    data
  })
}

export function modifyShopDetail(data) {
  return request({
    url: 'http://101.132.44.253:8762/background/modifyShopDetail',
    method: 'post',
    data
  })
}

export function deleteShop(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/deleteShop',
    method: 'post',
    data
  })
}

export function setShopBaseConf(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/setShopBaseConf',
    method: 'post',
    data
  })
}

export function getShopBaseConf(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getShopBaseConf',
    method: 'post',
    data
  })
}
// 应用-多商户体现列表
export function getWithdrawCashListByAdmin(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getWithdrawCashListByAdmin',
    method: 'post',
    data
  })
}

// 方案-方案列表
export function getSampleList(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSampleList',
    method: 'post',
    data
  })
}
// 方案-获取方案详情

export function getSample(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSample',
    method: 'post',
    data
  })
}
// 方案-保存方案

export function saveSample(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/saveSample',
    method: 'post',
    data
  })
}

// 组件方案-可选组件列表
export function getSelectProductList(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSelectProductList',
    method: 'post',
    data
  })
}
// 方案-设置状态
export function setSampleStatus(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/setSampleStatus',
    method: 'post',
    data
  })
}

// 文件上传

export function uploadFile(data) {
  return request({
    url: 'http://101.132.44.253:8765/uploadFile',
    method: 'post',
    data
  })
}

// 方案 -统计

export function getSampleCountDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSampleCountDetail',
    method: 'post',
    data
  })
}

// 订单-查看详情（首页）
export function getSODetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSODetail',
    method: 'post',
    data
  })
}

// 订单-确认发货
export function comfirmShipment(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/comfirmShipment',
    method: 'post',
    data
  })
}

// 订单-修改备注
export function modifySaleOrderRemark(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/modifySaleOrderRemark',
    method: 'post',
    data
  })
}

// 订单-获取订单列表（搜索）
export function searchSaleOrders(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/searchSaleOrders',
    method: 'post',
    data
  })
}

// 财务获取列表
export function searchWithdrawCash(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/searchWithdrawCash',
    method: 'post',
    data
  })
}
// 提现审核（通过拒绝）

export function checkWithdrawCash(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/checkWithdrawCash',
    method: 'post',
    data
  })
}
// 订单交易概述
export function getSODealSummary(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSODealSummary',
    method: 'post',
    data
  })
}
// 订单-查看订单发货地址

export function getDeliveryInfo(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getDeliveryInfo',
    method: 'post',
    data
  })
}
// 组件-组件列表
export function getProductList(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getProductList',
    method: 'post',
    data
  })
}

export function differentData(data) {
  return request(
    {
      url: 'http://localhost:9102/all_data-get',
      method: 'post',
      data
    }
  )
}

// 获取real_time_data的数据
export function getRealData() {
  return request({
    // url: 'http://101.201.71.184:9002/data_get',
    url: 'http://localhost:9102/real_data-get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'get'
  })
}

// 获取task_type数据
export function getTaskType() {
  return request({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: 'http://localhost:9102/task_type-get',
    method: 'get'
  })
}

// 获取task_units数据
export function getTaskUnits() {
  return request({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: 'http://localhost:9102/task_units-get'
  })
}

// 提交农事信息
export function taskInput(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'http://localhost:9102/task-post',
    method: 'post',
    data
  })
}

// 组件-查看组件详情
export function getProductInfo(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getProductInfo',
    method: 'post',
    data
  })
}
// 组件保存组件
export function setProductInfo(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/setProductInfo',
    method: 'post',
    data
  })
}
// 组件-统计信息
export function getProductDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getProductDetail',
    method: 'post',
    data
  })
}

// 组件-设置方案状态
export function setProductStatus(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/setProductStatus',
    method: 'post',
    data
  })
}
// 组件方案 - 商家列表
export function getAllShopList(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getAllShopList',
    method: 'post',
    data
  })
}
// 应用-多商户管理统计信息

export function getMultiShopDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getMultiShopDetail',
    method: 'post',
    data
  })
}

// 订单-维权订单处理
export function modifyReturnSOStatus(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/modifyReturnSOStatus',
    method: 'post',
    data
  })
}
// 订单-查看维权订单详情
export function viewSOReturnDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/viewSOReturnDetail',
    method: 'post',
    data
  })
}
// 转账
export function alipayTransfer(data) {
  return request({
    url: 'http://101.132.44.253:8768/pay/alipayTransfer',
    method: 'post',
    data
  })
}
// 会员订单-获取会员订单列表

export function getMemberSaleOrder(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getMemberSaleOrder',
    method: 'post',
    data
  })
}

// 订单 - 搜索退货订单
export function searchReturnOrders(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/searchReturnOrders',
    method: 'post',
    data
  })
}
// 结算-搜索提现申请列表
export function searchShopWithdrawCash(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/searchShopWithdrawCash',
    method: 'post',
    data
  })
}
// 结算-结算概述
export function getWithdrawCashDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getWithdrawCashDetail',
    method: 'post',
    data
  })
}

// 结算-提现单概述
export function getWithdrawCountDetail(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getWithdrawCountDetail',
    method: 'post',
    data
  })
}

// 结算-提现概述
export function getSODetailandWithdrawCash(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getSODetailandWithdrawCash',
    method: 'post',
    data
  })
}

// 供应商设置-获取商城信息
export function getShopConfig(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/getShopConfig',
    method: 'post',
    data
  })
}
// 供应商设置-商城设置
export function setShopConfig(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/setShopConfig',
    method: 'post',
    data
  })
}
// 结算-申请提现
export function applyWithdrawCash(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/applyWithdrawCash',
    method: 'post',
    data
  })
}

export function modifySaleOrderStatus(data) {
  return request({
    url: 'http://101.132.44.253:8767/background/modifySaleOrderStatus',
    method: 'post',
    data
  })
}
