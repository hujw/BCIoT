import 'babel-polyfill'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import _ from 'lodash'
import urlJoin from 'url-join'
import Actions from 'js/actions'

const mapStateToProps = (state) => ({
  status: state.Status
})

const mapDispatchToProps = (dispatch) => ({
  setStatus: (data) => dispatch(Actions.Status.set(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    static propTypes = {}
    static defaultProps = {}

    constructor (props) {
      super(props)
      this.setState({})
    }

    componentDidMount () {
      this.props.setStatus({
        pageType: 'indexPage'
      })
    }

    render () {
      return (
        <div>
                This is a firmware upload system bases on Block Chain.
        </div>
      )
    }
})
