import { createAction } from 'redux-actions'
import Api from 'js/api'

export default {
  set: createAction('SET_STATUS', Api.PromiseWrapper)
}
