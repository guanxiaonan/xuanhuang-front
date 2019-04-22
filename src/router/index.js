import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index'),
    name: 'dashboard',
    meta: {
      title: '主页',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/program',
    component: Layout,
    redirect: '/program/index',
    alwaysShow: true,
    meta: {
      title: '农事管理',
      icon: 'documentation',
      roles: ['admin']
    },
    children: [{
      path: 'p-sell',
      component: _import('program/p-sell'),
      name: 'p-sell',
      meta: {
        title: '农事管理',
        roles: ['admin']
      }
    }
    ]
  },
  {
    path: '/zujian',
    component: Layout,
    redirect: 'noredirect',
    name: 'zujian',
    meta: {
      title: '数据中心',
      icon: 'component'
    },
    children: [
      {
        path: 'sold',
        component: _import('sale/sold'),
        name: 'sold',
        meta: {
          title: '传感器采集数据'
        }
      },
      {
        path: 'chayuan1',
        component: _import('sale/chayuan1'),
        name: 'chayuan1',
        meta: {
          title: '茶园1信息'
        }
      },
      {
        path: 'chayuan2',
        component: _import('sale/chayuan2'),
        name: 'chayuan2',
        meta: {
          title: '茶园2信息'
        }
      },
      {
        path: 'chayuan3',
        component: _import('sale/chayuan3'),
        name: 'chayuan3',
        meta: {
          title: '茶园3信息'
        }
      }
    // {
    //   path: 'warehouse',
    //   component: _import('sale/warehouse'),
    //   name: 'warehouse',
    //   meta: {
    //     title: '光照数据'
    //   }
    // },
    // {
    //   path: 'recycle',
    //   component: _import('sale/recycle'),
    //   name: 'recycle',
    //   meta: {
    //     title: '空气数据'
    //   }
    // }
    ]
  },
  {
    path: '/image-manage',
    component: Layout,
    children: [{
      path: 'image',
      component: _import('image-manage/image'),
      name: 'image',
      meta: {
        title: '图片管理',
        icon: 'clipboard'
      }
    }]
  },
  {
    path: '/video-manage',
    component: Layout,
    children: [{
      path: 'image',
      component: _import('video-manage/test'),
      name: 'image',
      meta: {
        title: '视频中心',
        icon: 'clipboard'
      }
    }]
  },
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'order',
  //   meta: {
  //     title: '图片管理',
  //     icon: 'clipboard'
  //   },
  //   children: [{
  //     path: '/order/dingdan',
  //     component: _import('order/dingdan/index'),
  //     name: 'o-order',
  //     meta: {
  //       title: '订单'
  //     },
  //     children: [{
  //       path: 'send',
  //       component: _import('order/dingdan/send'),
  //       name: 'send',
  //       meta: {
  //         title: '待发货'
  //       }
  //     },
  //     {
  //       path: 'take',
  //       component: _import('order/dingdan/take'),
  //       name: 'take',
  //       meta: {
  //         title: '待收货'
  //       }
  //     },
  //     {
  //       path: 'pay',
  //       component: _import('order/dingdan/pay'),
  //       name: 'pay',
  //       meta: {
  //         title: '待付款'
  //       }
  //     },
  //     {
  //       path: 'complete',
  //       component: _import('order/dingdan/complete'),
  //       name: 'complete',
  //       meta: {
  //         title: '已完成'
  //       }
  //     },
  //     {
  //       path: 'shutdown',
  //       component: _import('order/dingdan/shutdown'),
  //       name: 'shutdown',
  //       meta: {
  //         title: '已关闭'
  //       }
  //     },
  //     {
  //       path: 'all',
  //       component: _import('order/dingdan/all'),
  //       name: 'all',
  //       meta: {
  //         title: '全部订单'
  //       }
  //     },
  //     {
  //       path: 'more',
  //       component: _import('order/dingdan/more'),
  //       name: 'more',
  //       meta: {
  //         title: '订单详情'
  //       }
  //     }
  //     ]
  //   },
  //   {
  //     path: '/order/rights',
  //     component: _import('order/rights/index'),
  //     name: 'rights',
  //     meta: {
  //       title: '维权'
  //     },
  //     children: [{
  //       path: 'r-apply',
  //       component: _import('order/rights/r-apply'),
  //       name: 'send',
  //       meta: {
  //         title: '维权申请'
  //       }
  //     },
  //     {
  //       path: 'r-complete',
  //       component: _import('order/rights/r-complete'),
  //       name: 'r-complete',
  //       meta: {
  //         title: '维权完成'
  //       }
  //     },
  //     {
  //       path: 'detial',
  //       component: _import('order/rights/detial'),
  //       name: 'detial',
  //       // hidden: true,
  //       meta: {
  //         title: '维权处理'
  //       }
  //     }
  //     ]
  //   }
  //   ]
  // },
  // {
  //   path: '/finance',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('finance/index'),
  //       name: 'finance',
  //       meta: { title: '财务', icon: 'money' }
  //     }
  //   ]
  // },
  // {
  //   path: '/supplier',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'supplier',
  //   meta: {
  //     title: '供应商',
  //     icon: 'international'
  //   },
  //   children: [{
  //       path: '/supplier/s-manage',
  //       component: _import('supplier/s-manage/index'),
  //       name: 's-manage',
  //       meta: {
  //         title: '商户管理'
  //       },
  //       children: [{
  //           path: 'enter',
  //           component: _import('supplier/s-manage/enter'),
  //           name: 'enter',
  //           meta: {
  //             title: '入驻中'
  //           }
  //         },
  //         {
  //           path: 'pause',
  //           component: _import('supplier/s-manage/pause'),
  //           name: 'pause',
  //           meta: {
  //             title: '暂停中'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: '/supplier/s-apply',
  //       component: _import('supplier/s-apply/index'),
  //       name: 's-apply',
  //       meta: {
  //         title: '提现申请'
  //       },
  //       children: [{
  //           path: 'confirm',
  //           component: _import('supplier/s-apply/confirm'),
  //           name: 'confirm',
  //           meta: {
  //             title: '待确认的'
  //           }
  //         },
  //         {
  //           path: 's-pay',
  //           component: _import('supplier/s-apply/s-pay'),
  //           name: 's-pay',
  //           meta: {
  //             title: '待付款的'
  //           }
  //         },
  //         {
  //           path: 's-paid',
  //           component: _import('supplier/s-apply/s-paid'),
  //           name: 's-paid',
  //           meta: {
  //             title: '已打款的'
  //           }
  //         },
  //         {
  //           path: 'invalid',
  //           component: _import('supplier/s-apply/invalid'),
  //           name: 'invalid',
  //           meta: {
  //             title: '无效的'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: '/supplier/s-set',
  //       component: _import('supplier/s-set/settlement'),
  //       name: 's-set',
  //       meta: {
  //         title: '基础设置'
  //       },
  // children: [{
  //   path: 'settlement',
  //   component: _import('supplier/s-set/settlement'),
  //   name: 'settlement',
  //   meta: {
  //     title: '基础设置'
  //   }
  // }]
  //     }
  //   ]
  // },
  // {
  //   path: '/close',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'close',
  //   meta: {
  //     title: '结算',
  //     icon: 'money'
  //   },
  //   children: [
  //     {
  //       path: '/close/s/summary',
  //       component: _import('close/s/summary'),
  //       name: 's',
  //       meta: {
  //         title: '结算概述'
  //       },
  //       children: [{
  //         path: 'summary',
  //         component: _import('close/s/summary'),
  //         name: 'summary',
  //         meta: {
  //           title: '结算概述'
  //         }
  //       }]
  //     },
  //     {
  //       path: '/close/cl-apply',
  //       component: _import('close/cl-apply/index'),
  //       name: 'cl-apply',
  //       meta: {
  //         title: '提现'
  //       },
  //       children: [{
  //         path: 'confirm',
  //         component: _import('close/cl-apply/confirm'),
  //         name: 'confirm',
  //         meta: {
  //           title: '待审核申请'
  //         }
  //       },
  //       {
  //         path: 'cl-pay',
  //         component: _import('close/cl-apply/cl-pay'),
  //         name: 'cl-pay',
  //         meta: {
  //           title: '待结算申请'
  //         }
  //       },
  //       {
  //         path: 'cl-paid',
  //         component: _import('close/cl-apply/cl-paid'),
  //         name: 'cl-paid',
  //         meta: {
  //           title: '已结算申请'
  //         }
  //       },
  //       {
  //         path: 'invalid',
  //         component: _import('close/cl-apply/invalid'),
  //         name: 'invalid',
  //         meta: {
  //           title: '已无效申请'
  //         }
  //       }
  //       ]
  //     },
  //     {
  //       path: '/close/result',
  //       component: _import('close/result/resultment'),
  //       hidden: true,
  //       name: 'result',
  //       meta: {
  //         title: '申请结果'
  //       },
  //       children: [{
  //         path: 'resultment',
  //         component: _import('close/result/resultment'),
  //         name: 'resultment',
  //         meta: {
  //           title: '申请结果列表'
  //         }
  //       }]
  //     }
  //   ]
  // },
  // {
  //   path: '/set',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: _import('set/index'),
  //     name: 'set',
  //     meta: {
  //       title: '设置',
  //       icon: 'example'
  //     }
  //   }]
  // },
  {
    path: '/call_alarm',
    component: Layout,
    children: [{
      path: 'call_alarm',
      component: _import('sale/call_alarm'),
      name: 'call_alarm',
      meta: {
        title: '报警',
        icon: 'example'
      }
    }]
  },
  {
    path: '/data',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('data/monitor'),
      name: 'monitor',
      meta: {
        title: '分析中心',
        icon: 'example'
      }
    }]
  },
  {
    path: '/my',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('my/index'),
      name: 'my',
      meta: {
        title: '我的账号',
        icon: 'people'
      }
    }]
  }

  // { // will always show the root menu // you can set roles in root nav // or you can only set roles in sub nav
  // if do not set roles, means: this page does not require permission
  // { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
  // { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
  // { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
  // { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
  // { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
  // { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
  // { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
  // { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
  // { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
  // { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
  // { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
  // { path: 'drag-dialog', component: _import('components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
  // { path: 'drag-kanban', component: _import('components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
  //   path: '/charts',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'charts',
  //   meta: {
  //     title: 'charts',
  //     icon: 'chart'
  //   },
  //   children: [
  //     { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
  //     { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
  //     { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table/complex-tabzle',
  //   name: 'example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('example/table/index'),
  //       redirect: '/example/table/complex-table',
  //       name: 'Table',
  //       meta: {
  //         title: 'Table',
  //         icon: 'table'
  //       },
  //       children: [
  //         { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
  //         { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
  //         { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
  //         { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
  //         { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
  //         { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
  //       ]
  //     },
  //     { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'form',
  //   meta: { title: 'form', icon: 'form' },
  //   children: [
  //     {
  //       path: 'create-form',
  //       component: _import('form/create'),
  //       name: 'createForm',
  //       meta: { title: 'createForm', icon: 'table' }
  //     },
  //     {
  //       path: 'edit-form',
  //       component: _import('form/edit'),
  //       name: 'editForm',
  //       meta: { title: 'editForm', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: { title: 'errorPages', icon: '404' },
  //   children: [
  //     {
  //       path: '401',
  //       component: _import('errorPage/401'),
  //       name: 'page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: _import('errorPage/404'),
  //       name: 'page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: _import('errorLog/index'),
  //       name: 'errorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'excel',
  //   meta: { title: 'excel', icon: 'excel' },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: _import('excel/exportExcel'),
  //       name: 'exportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: _import('excel/selectExcel'),
  //       name: 'selectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: _import('excel/uploadExcel'),
  //       name: 'uploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: _import('zip/index'),
  //       name: 'exportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('theme/index'),
  //       name: 'theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('clipboard/index'),
  //       name: 'clipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('i18n-demo/index'),
  //       name: 'i18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]
