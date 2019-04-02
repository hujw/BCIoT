import { handleActions } from 'redux-actions'
import _ from 'lodash'
import toastr from 'toastr'

const initialState = {}

export default handleActions({
  FILE_GETS: {
    next (state, {payload}) {
      const files = _.keyBy(payload.files, 'id')
      return files
    },
    throw (state, {payload}) {
      return state
    }
  },
  FILE_UPLOAD: {
    next (state, {payload}) {
      toastr.success('upload success')
      return state
    },
    throw (state, {payload}) {
      toastr.error(payload.error)
      return state
    }
  },
  FILE_DELETE: {
    next (state, {payload}) {
      toastr.success(payload.message)
      return state
    },
    throw (state, {payload}) {
      toastr.error(payload.error)
      return state
    }
  }
}, initialState)
