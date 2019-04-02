import { handleActions } from 'redux-actions'

const initialState = {
  pageType: null
}

export default handleActions({
  SET_STATUS: {
    next (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    throw (state, {payload}) {
      return {
        ...state
      }
    }
  }
}, initialState)
