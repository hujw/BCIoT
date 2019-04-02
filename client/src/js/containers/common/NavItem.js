import React, { Component } from 'react'
import {
  NavItem,
  utils
} from 'react-bootstrap'

import { connect } from 'react-redux'

class Navitem extends Component {
  render () {
    const {onClick, onSelect, ...props} = this.props
    return (
      <NavItem {...props} onClick={
        utils.createChainedFunction(onClick, onSelect)
      }/>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Navitem)
