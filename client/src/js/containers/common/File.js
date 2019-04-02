import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {
  FormControl,
  Button
} from 'react-bootstrap'
import { connect } from 'react-redux'

class File extends Component {
    static propTypes = {
      onChange: PropTypes.func
    }
    static defaultProps = {
      onChange: () => {}
    }

    constructor (props) {
      super(props)
      this.onChange = this.onChange.bind(this)
      this.onClick = this.onClick.bind(this)
      this.state = {
        showLabel: 'Upload'
      }
    }

    onChange (e) {
      this.props.onChange(arguments)
      this.setState({
        showLabel: e.target.value
      })
    }

    onClick () {
      ReactDOM.findDOMNode(this.refs.input).click()
    }

    render () {
      const showLabel = this.state.showLabel || 'Upload'
      return (
        <div style={{
          height: '100%',
          width: 'auto',
          display: 'inline-block'
        }}>
          <Button
            ref="btn"
            onClick={this.onClick}
            style={{...this.props.style}}
          >
            {showLabel}
          </Button>
          <FormControl {...this.props}
            ref="input"
            type="file"
            onChange={this.onChange}
            style={{display: 'none'}}/>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(File)
