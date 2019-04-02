import { handleActions } from 'redux-actions'
import _ from 'lodash'
import toastr from 'toastr'

const initialState = {}

export default handleActions({
  USER_LOGIN: {
    next (state, {payload}) {
      toastr.success(payload.message)
      return state
    },
    throw (state, {payload}) {
      toastr.error(payload.error)
      return state
    }
  },
  USER_LOGOUT: {
    next (state, {payload}) {
      toastr.success(payload.message)
      return {}
    },
    throw (state, {payload}) {
      toastr.error(payload.error)
      return {}
    }
  }
}, initialState)
