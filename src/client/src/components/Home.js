import React, { Component } from 'react'
import { fetchUser } from '../helpers/api'

export default class Home extends Component {
  componentDidMount() {
    fetchUser().then(user => console.log(user))
  }

  render () {
    return (
      <div>
        Home. Not Protected. Anyone can see this.
      </div>
    )
  }
}