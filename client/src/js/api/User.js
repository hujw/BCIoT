import ApiFetch from './Base'
import urlJoin from 'url-join'

export default {
  login: (data) => ApiFetch('/users/login/', {
    method: 'POST',
    body: data
  }),
  logout: (data) => ApiFetch('/users/logout/', {
    method: 'GET',
    body: data
  })
}
