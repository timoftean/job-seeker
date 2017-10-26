import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	Button,
	IconButton,
  Menu,
  MenuItem
} from 'react-mdl'


export default class Profile extends Component {
  render () {
    return (
      <div>
        <Card shadow={0} style={{width: '500px', margin: 'auto'}}>
          <CardTitle style={{height: '100px'}}>
            Profile
            <div style={{position: 'relative'}}>
              <IconButton name="more_vert" id="demo-menu-lower-left" />
              <Menu target="demo-menu-lower-left">
                <MenuItem>Edit Profile</MenuItem>
                <MenuItem>
                  <Link to="/ProviderForm">Create provider profile</Link>
                </MenuItem>
                <MenuItem>Post Job</MenuItem>
              </Menu>
            </div>
          </CardTitle>
          <CardText>
            <div>
              <label>Nume </label>
              <span>Popescu</span>
            </div>
            <div>
              <label>Prenume </label>
              <span>Andrei</span>
            </div>
          </CardText>
          <CardActions border>
            <Link to="/jobs" >
              <Button colored>Show Jobs</Button>
            </Link>
            <div className="mdl-layout-spacer"></div>
            <Link to="/providers" >
              <Button colored>Show Providers</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}
