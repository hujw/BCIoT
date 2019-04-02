import React, { Component } from 'react'
import { Router, IndexRoute, Route, browserHistory, IndexRedirect } from 'react-router'
import store from './stores/Store'
import { syncHistoryWithStore } from 'react-router-redux'
import Containers from './containers'
import Actions from './actions'
import _ from 'lodash'

const history = syncHistoryWithStore(browserHistory, store)

const checkLogin = async (nextState, replace, callback) => {
  callback()
}

export default class Root extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path="/" component={Containers.App}>
          <Route path="" component={Containers.common.Nav}>
            <Route path="" component={Containers.common.Screen1280}>
              <Route path="" component={Containers.common.MainContainer}>
                <IndexRoute component={Containers.IndexPage}/>
                <Route path="signin/" component={Containers.Signin}/>
                <Route path="admin/" onEnter={checkLogin}>
                  <IndexRoute/>
                </Route>
                <Route path="files/">
                  <IndexRoute component={Containers.file.FileList}/>
                  <Route path="new/" component={Containers.file.NewFile}/>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="signin/" component={Containers.Signin}/>
        </Route>
      </Router>
    )
  }
}
