import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Containers from 'containers'
import Radium, { StyleRoot } from 'radium'

@Radium
export default CSSModules(class extends Component {
  render () {
    return (
      <StyleRoot>
        <div style={{
          height: '100vh',
          width: '100wh',
          display: 'flex',
          overflow: 'hidden'
        }}>
          { this.props.children }
          { process.env.NODE_ENV !== 'production' ? <Containers.DevTools/> : null }
        </div>
      </StyleRoot>
    )
  }
}, require('./App.styl'))
