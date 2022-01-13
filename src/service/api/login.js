import gullRequest from '@/service'

export function login(account) {
  return gullRequest.post({
    url: '/login',
    data: account
  })
}
// 通过 id 获取用户信息
export function requestUserInfoById(id) {
  return gullRequest.get({
    url: '/users/' + id,
    showLoading: false
  })
}
// 查询角色菜单树
export function requestUserMenusByRoleId(id) {
  return gullRequest.get({
    url: '/role/' + id + '/menu',
    showLoading: false
  })
}
