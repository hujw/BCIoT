import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import Users from './Users'
import Files from './Files'
import Status from './Status'

export default combineReducers({
  routing,
  Users,
  Status,
  Files
})
