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
	List,
	ListItem,
	CardMenu
} from 'react-mdl'
import Jobs from '../Jobs'
import EditUserProfile from './EditUserProfile'
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
	
	async componentDidMount() {
		const user = await this.userController.getCurrentUser()
		const jobs = await this.jobController.getUserJobs()
		this.setState({
			user: user,
			isProvider: user.info.isProvider,
			hasPostedJob: user.info.hasPostedJob,
			jobs: jobs
		})
	}
	
	renderProfileTab = () => {
		console.log("Usr",this.state.user)
		if (this.state.user.profile) {
			return (
				<Card shadow={0} style={{width: '500px', margin: 'auto'}}>
					<CardTitle style={{height: '100px'}}>
						Profile
						<div style={{position: 'relative'}}>
							<IconButton name="more_vert" id="demo-menu-lower-left"/>
							<Menu target="demo-menu-lower-left">
								<MenuItem>
									<Link to="/editProfile">Edit profile</Link>
								</MenuItem>
							</Menu>
						</div>
					</CardTitle>
					<CardText>
						<div>
							<span>{this.state.user.profile.firstName} {this.state.user.profile.lastName}</span>
						</div>
						<div>
							<span>{this.state.user.profile.location}</span>
						</div>
					</CardText>
					<CardActions border>
						<Link to="/add-job">
							<Button colored>Posta a job</Button>
						</Link>
						<Link to="/ProviderForm">
							<Button colored className="pull-right">Create provider profile</Button>
						</Link>
					</CardActions>
				</Card>
			)
		} else {
			return (<EditUserProfile {...this.props}/>)
		}
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
        return  <Jobs jobs={this.state.jobs} from="profile"/>
		  default:
			  return this.renderProfileTab()
    }
  }
  
  render () {
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

