import gullRequest from '@/service'

// 获取数据列表
export function getPageListData(url, data) {
  return gullRequest.post({
    url: url,
    data: data
  })
}
// 通过 id 获取单个数据
export function getPageDataById(url, id) {
  return gullRequest.get({
    url: url + '/' + id
  })
}
// 删除
export function deletePageData(url) {
  return gullRequest.delete({
    url
  })
}
// 创建
export function createPageData(url, data) {
  return gullRequest.delete({
    url,
    data
  })
}
// 修改
export function editPageData(url, data) {
  return gullRequest.patch({
    url,
    data
  })
}
