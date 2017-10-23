import React, { Component } from 'react'

export default class Profile extends Component {
  render () {
    return (
      <div>
        Profile. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}