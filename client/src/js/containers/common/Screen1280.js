import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

@Radium
class Screen1280 extends Component {
  render () {
    return (
      <div
        style={{
          maxWidth: '1280px',
          flex: 1,
          display: 'flex',
          width: '100%'
        }}>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Screen1280)
