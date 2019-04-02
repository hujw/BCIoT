import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import Actions from 'js/actions'
import Containers from 'js/containers'
import {
  Button,
  Grid,
  Col,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Table,
  Panel,
  Pagination,
  Glyphicon
} from 'react-bootstrap'
import CSSModules from 'react-css-modules'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import { promiseAlert } from 'promise-alert'
import urlJoin from 'url-join'
import { HOST, VERSION } from 'js/api/Config'
import _ from 'lodash'

@Radium
class FileList extends Component {
  constructor (props) {
    super(props)
    this.deleteFile = this.deleteFile.bind(this)
    this.refresh = undefined
  }

  async componentWillMount () {
    this.props.setStatus({
      pageType: 'files'
    })
    const {payload: {files}} = await this.props.getsFile()
    console.log('get', files)
    if (!_.every(files, 'finished')) {
      this.refresh = setInterval(this.props.getsFile, 5000)
    }
  }

  async deleteFile (id) {
    const deleted = await promiseAlert({
      title: `Delete File`,
      text: 'Are you sure ?',
      confirmButtonText: 'Delete it',
      cancelButtonText: 'Keep it',
      type: 'warning',
      showCancelButton: true
    })
    if (!deleted) return
    const {error} = await this.props.deleteFile({id})
    if (error) return
    this.props.getsFile()
  }

  componentWillReceiveProps (nextProps) {
    const files = nextProps.files || {}
    console.log(files)
    console.log(_.every(files, 'finished'))
    console.log(this.refresh)
    if (this.refresh && _.every(files, 'finished')) {
      console.log('clear')
      clearInterval(this.refresh)
      this.refresh = undefined
    }
  }

  componentWillUnmount () {
    clearInterval(this.refresh)
    this.refresh = undefined
  }

  render () {
    const {files} = this.props
    console.log('state', files)
    return (
      <Col md={12} style={{
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div className="margin-bottom">
          <LinkContainer
            to={`/files/new/`}>
            <Button bsStyle="success">New</Button>
          </LinkContainer>
        </div>
        <h2 className="text-center margin-right">
          {
            _.every(files, 'finished') ? null : (
              <Glyphicon glyph="refresh"
                className="glyphicon-refresh-animate"
              />
            )
          }
        </h2>
        <Panel className='no-padding'>
          <Table responsive striped hover style={{margin: '0'}}>
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Swarm Hash</th>
                <th>SHA256</th>
                <th>Finished</th>
                <th>VirusTotal Report</th>
                <th>Download</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                _.sortBy(_.values(files, ['id'])).map((file, idx) => (
                  <tr key={file.id}>
                    <td>
                      {idx + 1}
                    </td>
                    <td>
                      {file.originalName}
                    </td>
                    <td>
                      {file.swarmHash}
                    </td>
                    <td>
                      {file.sha256}
                    </td>
                    <td>
                      {file.finished ? 'Yes' : 'No'}
                    </td>
                    <td>
                      <Button bsStyle='warning' bsSize="xs"
                        onClick={() => window.open(file.url)}
                      >
                                                Report
                      </Button>
                    </td>
                    <td>
                      <Button bsStyle='success' bsSize="xs"
                        href={urlJoin(HOST, VERSION, 'files', file.id)}
                      >
                                                Download
                      </Button>
                    </td>
                    <td>
                      <Button bsStyle='danger' bsSize="xs"
                        onClick={() => this.deleteFile(file.id)}
                      >
                                                Remove
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Panel>
      </Col>

    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  files: state.Files
})

const mapDispatchToProps = (dispatch) => ({
  getsFile: (data) => dispatch(Actions.File.gets(data)),
  deleteFile: (data) => dispatch(Actions.File.delete(data)),
  setStatus: (data) => dispatch(Actions.Status.set(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(FileList, require('./File.styl')))
