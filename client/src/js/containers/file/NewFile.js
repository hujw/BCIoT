import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Radium from 'radium'
import Actions from 'js/actions'
import Containers from 'js/containers'
import {
  Form,
  ControlLabel,
  FormControl,
  FormGroup,
  Button,
  Row,
  Col,
  Panel
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import _ from 'lodash'

@Radium
class NewFile extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.props.setStatus({
      pageType: 'newFile'
    })
  }

  async onSubmit () {
    const data = new FormData(ReactDOM.findDOMNode(this.refs.basic))
    await this.props.onSubmit(data)
    this.props.router.push('/files/')
  }

  render () {
    return (
      <div>
        <Form ref="basic">
          <ControlLabel className="margin-right">File Upload</ControlLabel>
          <Containers.common.File name="file"/>
          <FormGroup>
            <Button bsStyle="success"
              onClick={this.onSubmit}>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(Actions.File.upload(data)),
  setStatus: (data) => dispatch(Actions.Status.set(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewFile)
