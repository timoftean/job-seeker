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
  MenuItem,
  Tab,
	Tabs,
	List
} from 'react-mdl'

import { User } from '../../controllers/User'
import { Job } from '../../controllers/Job'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  activeTab: 0,
      user: {},
			isProvider:null,
			hasPostedJob:null
		};
		this.userController = new User()
		this.jobController = new Job()
	}
	
	componentDidMount() {
		this.userController.getCurrentUser().then(user =>{
			this.setState({
				user: user.info,
				isProvider: user.info.isProvider,
				hasPostedJob: user.info.hasPostedJob
			})
		})
	}
	
	renderProfileTab = () => {
	  return (
    
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
              <MenuItem>
                <Link to="/add-job" >Post Job</Link>
              </MenuItem>
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
          <Link to="/add-job" >
            <Button colored>Posta a job</Button>
          </Link>
          <Link to="/ProviderForm" >
            <Button colored className="pull-right">Create provider profile</Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
	
	renderJobsTab = async () => {
		const jobs = await this.jobController.getUserJobs()
	  return (
	    <div>
		    <List>
			    {
				    Object.keys(jobs).map((key) => {
					    return this.renderJob(key,this.state.jobs[key])
				    })
			    }
		    </List>b</div>
    )
  }
	
	renderProviderTab = () => {
	  return (
	    <div>Provider tab</div>
    )
  }
  
	renderTab = () => {
	  switch (this.state.activeTab) {
      case 1:
        return this.renderProviderTab()
      case 2:
        return this.renderJobsTab()
		  default:
			  return this.renderProfileTab()
    }
  }
  
  render () {
		console.log("currentuser",this.state.isProvider? 'yes':'no')
	  const isProvider = this.state.isProvider
    return (
      <div>
        <div className="demo-tabs">
          <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
            <Tab>Profile</Tab>
            {
            	this.state
              ?<Tab>My provider profile</Tab>
              :null
            }
	          {this.state
		          ?<Tab>Posted Jobs</Tab>
		          :null
	          }
          </Tabs>
          <section>
            {this.renderTab()}
          </section>
        </div>
      </div>
    )
  }
}

