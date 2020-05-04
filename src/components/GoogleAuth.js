import React, { Component } from 'react'
import { connect } from 'react-redux'

import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {

  componentDidMount() {
    // - Load up the google api library
    window.gapi.load('client:auth2', () => {
      // - Initialize it
      window.gapi.client.init({ // init returns a Promise
        clientId: process.env.REACT_APP_GOOGlE_AUTH,
        scope: 'email'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.onAuthChange(this.auth.isSignedIn.get()) // passes in boolean
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId()) // passes in the current user unique id(from Google account)
    } else {
      this.props.signOut()
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui button google red" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
          </button>
      )
    } else {
      return (
        <button className="ui button google green" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In With Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.authReducer.isSignedIn
  }
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth)