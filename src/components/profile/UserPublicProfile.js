import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText, Button, CardActions, CardMenu } from 'react-mdl'
import { User } from '../../controllers/User'

class UserPublicProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      pictureUrl: null,
      user: this.props
    }
    this.userController = new User()
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({user:nextProps.user})
  }
  
  componentDidMount() {
    const { id } = this.props.match.params
    this.userController.getUserById(id)
      .then( user => {
        this.userController.getPictureByUserId(id)
          .then(res => {
            if(res.code && res.code === "storage/object-not-found") {
              this.setState({loaded: true, user})
            } else {
              this.setState({pictureUrl:res, loaded: true, user})
            }
          })
          .catch((error) => {
            switch (error.code) {
              case 'storage/object_not_found':
                console.log("File does not exists")
                this.setState({loaded: true})
                break;
              case 'storage/unauthorized':
                console.log("Unauthorized")
                this.setState({loaded: true})
                break;
            }
          })
      })
  }
  
  getStyle = () => {
    return this.state.pictureUrl !== null
      ?{
        color: '#fff',
        height: '300px',
        background: `url(${this.state.pictureUrl}) center / cover`
      }
      :{
        color: 'black',
        height: '70px',
      }
  }
  
  render() {
    console.log()
    if (!this.state.loaded) return null
    const { user } = this.state
    return (
      <Card shadow={0} style={{width: '600px',minHeight:'0', margin: 'auto'}}>
        <CardTitle style={this.getStyle()}>
          <div>
            {user.profile.firstName} {user.profile.lastName}
          </div>
        </CardTitle>
        <CardText>
          <div>
            {user.info.email}
          </div>
        </CardText>
        <CardActions>
          <a href={"mailto:?subject=JobSeeker - New user recommendation! &body=You have a new profile recommendation for: \n\n " + window.location.href}>
            <Button raised>
              SHARE! 
            </Button>
          </a>
        </CardActions>
      </Card>
    )
  }
}

export default UserPublicProfile
