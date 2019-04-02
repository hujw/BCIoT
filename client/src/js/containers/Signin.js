import 'babel-polyfill'
import { connect } from 'react-redux'
import Actions from 'js/actions'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {
  Grid,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Button
} from 'react-bootstrap'
import _ from 'lodash'
import urlTool from 'url'
import Radium from 'radium'
import { browserHistory } from 'react-router'

@Radium
class SignIn extends Component {
    static propTypes = {
      login: PropTypes.func.isRequired
    }
    static defaultProps = {}

    constructor (props) {
      super(props)
      this.login = this.login.bind(this)
    }

    async login () {
      let data = new FormData(ReactDOM.findDOMNode(this.refs.form))
      const {error} = await this.props.login(data)
      if (error) return
      this.props.history.goBack(-1)
    }

    async componentDidMount () {
    }

    render () {
      return (
        <Col md={12}>
          <Form ref="form" id="signForm" horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                            Email:
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="username"/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                            Password:
              </Col>
              <Col sm={10}>
                <FormControl type="password" name="password"/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={2}>
                <Button onClick={this.login}>submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      )
    }
}

const mapStateToProps = (state, ownProps) => ({
  users: state.Users
})

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(Actions.User.login(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
