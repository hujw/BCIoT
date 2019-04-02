import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import RootRouter from 'js/routes'
import store from 'js/stores/Store'
import toastr from 'toastr'
require('react-datetime/css/react-datetime.css')
require('bootstrap/dist/css/bootstrap.min.css')
require('sweetalert/dist/sweetalert.css')
require('toastr/build/toastr.css')

if (typeof (document) !== 'undefined' && window) {
  window.onload = () => {
    toastr.options.positionClass = 'toast-bottom-right'
    return render(
      <Provider store={store}>
        <RootRouter/>
      </Provider>,
      document.getElementById('app')
    )
  }
}
