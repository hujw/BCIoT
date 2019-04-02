import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import MdPerson from 'react-icons/lib/md/person'
import Radium from 'radium'
import Containers from 'js/containers'
import { connect } from 'react-redux'
import Actions from 'js/actions'
import _ from 'lodash'

@Radium
class NavbarBase extends Component {
  render () {
    const {pageType} = this.props.status
    const {fixedTop} = this.props
    const visibility = fixedTop ? 'hidden' : 'visible'
    return (
      <Navbar
        fixedTop={fixedTop}
        fluid
        collapseOnSelect
        style={{
          margin: '0px',
          border: '0px',
          visibility: visibility
        }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: 'auto auto'
          }}>
          <div
            className="navbar-header"
            style={{
              textAlign: 'center',
              width: '160px',
              '@media (max-width: 768px)': {
                width: 'auto'
              }
            }}>
            <Navbar.Brand>
              <Link to="/">
                                IOT
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </div>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer
                to={`/files/`}
                active={pageType === 'files'}
              >
                <Containers.common.NavItem>
                                   Files
                </Containers.common.NavItem>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer
                to={`/files/new/`}
                active={pageType === 'newFile'}
              >
                <Containers.common.NavItem>
                                   Upload New File
                </Containers.common.NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <NavDropdown id="person" title={
                <MdPerson/>
              }>
                <Containers.common.NavItem>Hi {'admin'}</Containers.common.NavItem>
                <MenuItem divider/>
                <Containers.common.NavItem
                  onClick={() => this.props.logout}>SignOut</Containers.common.NavItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    )
  }
}

@Radium
class nav extends Component {
  render () {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1'
        }}>
        <NavbarBase {...this.props} fixedTop/>
        <NavbarBase {...this.props} />
        <div
          style={{
            flex: '1',
            display: 'flex'
          }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.Users,
  status: state.Status
})

const mapDispatchToProps = (dispatch) => ({
  logout: dispatch(Actions.User.logout)
})

export default connect(mapStateToProps, mapDispatchToProps)(nav)
