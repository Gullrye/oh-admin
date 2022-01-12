import gullRequest from '@/service'

export function login(account) {
  return gullRequest.post({
    url: '/login',
    data: account
  })
}
