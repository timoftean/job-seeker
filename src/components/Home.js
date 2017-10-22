import React, { Component } from 'react'
import { User } from '../controllers/User'

export default class Home extends Component {
  componentDidMount() {
    const user = new User().getCurrentUser()
  }

  render () {
    return (
      <div>
        Home. Not Protected. Anyone can see this.
      </div>
    )
  }
}