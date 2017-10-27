import React, { Component } from 'react'
import  { Link } from 'react-router-dom'
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	Button,
	CardMenu,
	IconButton,
	List,
	ListItem,
	FABButton,
	Icon
} from 'react-mdl'

import { Job } from '../controllers/Job'

export default class Jobs extends Component {
	constructor(props) {
		super(props)
		this.state={
			jobs: props.jobs
		}
		this.jobController = new Job()
	}
	
	renderJob = (key,job) => {
		let url = `/add-job?id=${key}&title=${job.title}&description=${job.description}&category=${job.category}&location=${job.location}`+
			`&numHours=${job.numHours}&timeInterval=${job.timeInterval}&price=${job.price}`
		return (
			<ListItem key={key}>
				<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
					<CardTitle style={{height: '100px'}}>{job.title}</CardTitle>
					<CardText>
						{job.description}
					</CardText>
					<CardActions border>
						{
							this.props.from === "profile"
								? (
									<div>
										<Link to={url} >
											<Button colored>Edit</Button>
										</Link>
										<FABButton onClick={() => this.deleteJob(key)} className="pull-right" colored mini ripple>
											X
										</FABButton>
									</div>
									)
								:<Button colored>Attend</Button>
						}
					</CardActions>
				</Card>
			</ListItem>
		)
	}
	
	deleteJob = async (key) => {
		return this.jobController.removeJob(key)
			.then(() => {
				console.log("Remove succeeded.")
				this.props.history.push('/profile')
			})
			.catch((error) => {
				console.log("Remove failed: " + error.message)
			});
		
		
	}
	
	render () {
		return (
			<div>
				<h1>Jobs</h1>
					<List>
						{
							Object.keys(this.state.jobs).map((key) => {
								return this.renderJob(key,this.state.jobs[key])
							})
						}
					</List>
			</div>
		)
	}
}

