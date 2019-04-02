import { createAction } from 'redux-actions'
import Api from 'js/api'

export default {
  login: createAction('USER_LOGIN', Api.User.login),
  logout: createAction('USER_LOGIN', Api.User.logout)
}
