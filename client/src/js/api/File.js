import ApiFetch from './Base'
import urlJoin from 'url-join'

export default {
  gets: (data) => ApiFetch('/files/', {
    method: 'GET',
    body: data
  }),
  upload: (data) => ApiFetch('/files/upload', {
    method: 'POST',
    body: data
  }),
  delete: (data) => ApiFetch(urlJoin('/files/', data.id), {
    method: 'DELETE',
    body: data
  })
}
