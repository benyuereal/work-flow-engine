import fetch from './fetch.js'

// // 登录
// export function login (data) {
//   return fetch({
//     url: '',
//     method: 'post',
//     data
//   })
// }
// // 登出
// export function logout () {
//   return fetch({
//     url: '',
//     method: 'post'
//   })
// }
const login = params => {
  return fetch({
    url: `/login`,
    method: 'post',
    params: {
      userInfo:true,
    }
  })
}

const procedureList = params => {
  return fetch({
    url: `/procedure/test`,
    method: 'get',
    params: params
  })
}

const articleList = params => {
  return fetch({
    url: `/api/search/query/listview/category/Android/count/${params.limit}/page/${params.page}`,
    method: 'get',
    params: ''
  })
}

const userList = params => {
  return fetch({
    url: '/api/person/getPersonListByCompany',
    method: 'get',
    params: params
  })
}

/**
 * 提交用户注册信息
 * @param params
 */
const postUserInfo = params => {
  return fetch({
    url: '',
    method: 'post',
    data: params
  })
}

/**
 * 验证邮箱 token是否过期
 * @param params
 */
const checkToken = params => {
  return fetch({
    url: '',
    method: 'get',
    params: params
  })
}
/**
 * 入口配置列表页
 * @param params
 */
const entranceList = params => {
  return fetch({
    url: `/entrance/find`,
    method: 'get',
    params: params
  })
}

const entranceRemove = params => {
  return fetch({
    url: `/entrance/remove`,
    method: 'post',
    params: params
  })
}

const goodsUnitDetail = params => {
  return fetch({
    url: `/init/getProduct`,
    method: 'get',
    params: params
  })
}

const entranceSave = params => {
  return fetch({
    url: `/entrance/save`,
    method: 'post',
    params: params
  })
}

const entranceUpdate = params => {
  return fetch({
    url: `/entrance/update`,
    method: 'post',
    params: params
  })
}
const procedureByEntranceId = params => {
  return fetch({
    url: `/procedure/getProcedureByEntrance`,
    method: 'get',
    params: params
  })
}

const procedureSaveOrUpdate = params => {
  return fetch({
    url: params.type===1?`/procedure/save`:`/procedure/update`,
    method: 'post',
    params: params
  })
}

const procedureRemove = params => {
  return fetch({
    url: `/procedure/remove`,
    method: 'post',
    params: params
  })
}

const entranceBindProcedure = params => {
  return fetch({
    url: `/entrance/bind`,
    method: 'post',
    params: params
  })
}

const nodeList = params => {
  return fetch({
    url: `/nodeManager/nodeList`,
    method: 'get',
    params: params
  })
}

const nodeDetail = params => {
  return fetch({
    url: `/nodeManager/getNodeDetail`,
    method: 'post',
    params: params
  })
}


const nodeRemove = params => {
  return fetch({
    url: `/nodeManager/removeNode`,
    method: 'post',
    params: params
  })
}

const nodeSave = params => {
  return fetch({
    url: `nodeManager/nodeSave`,
    method: 'post',
    params: params
  })
};

const ruleSaveOrUpdate = params => {
  return fetch({
    url: `/procedure/rule/update`,
    method: 'post',
    params: params
  })
};

const apiList = {
  procedureList,
  articleList,
  userList,
  postUserInfo,
  checkToken,
  entranceList,
  entranceRemove,
  goodsUnitDetail,
  entranceSave,
  entranceUpdate,
  procedureByEntranceId,
  procedureSaveOrUpdate,
  procedureRemove,
  entranceBindProcedure,
  nodeList,
  nodeDetail,
  nodeRemove,
  nodeSave,
  login,
  ruleSaveOrUpdate,

}

export default apiList
