import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import { Grid } from 'react-bootstrap'

@Radium
class MainContainer extends Component {
  render () {
    return (
      <Grid fluid style={{
        margin: '5px auto'
      }}>

        {this.props.children}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
