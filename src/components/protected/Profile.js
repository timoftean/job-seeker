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
	ListItem,
	CardMenu
} from 'react-mdl'
import Jobs from '../Jobs'
import EditUserProfile from './EditUserProfile'
import { User } from '../../controllers/User'
import { Job } from '../../controllers/Job'
import { Provider } from '../../controllers/Provider'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  activeTab: 0,
      user: {},
			providerProfile: {},
			isProvider:null,
			hasPostedJob:null,
		};
		this.userController = new User()
		this.jobController = new Job()
		this.providerController = new Provider()
	}
	
	async componentDidMount() {
		const user = await this.userController.getCurrentUser()
		const jobs = await this.jobController.getUserJobs()
		const provider = await this.providerController.getUserProviderProfile()
		console.log("Provider",provider)
		this.setState({
			user: user,
			providerProfile: provider ? provider[Object.keys(provider)[0]] : null,
			isProvider: user.info.isProvider,
			hasPostedJob: user.info.hasPostedJob,
			jobs: jobs
		})
	}
	
	renderProfileTab = () => {
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
		  <ListItem >
			  <Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
				  <CardTitle style={{height: '100px'}}>{this.state.providerProfile? this.state.providerProfile.description:null}</CardTitle>
				  <CardText>
					  {this.state.providerProfile? this.state.providerProfile.location:null}
				  </CardText>
				  <CardActions border>
					  <Button colored>Edit</Button>
				  </CardActions>
				  <CardMenu style={{color: '#fff'}}>
					  <IconButton name="share" />
				  </CardMenu>
			  </Card>
		  </ListItem>
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
	  console.log("Usr",this.state.user)
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

