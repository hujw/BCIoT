import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import {
  Col,
  Row,
  Panel,
  Table,
  Button
} from 'react-bootstrap'
import { connect } from 'react-redux'
import Actions from 'js/actions'
import _ from 'lodash'
import { promiseAlert, swal } from 'promise-alert'
import urlTool from 'url'

@Radium
class User extends Component {
    static propTypes = {}
    static defaultProps = {}

    constructor (props) {
      super(props)
      this.setState({})
    }

    componentDidMount () {
    }

    render () {
      return (
        <div>hi</div>
      )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(User)
