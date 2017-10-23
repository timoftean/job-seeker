import React, { Component } from 'react'
import { Job } from '../controllers/Job'
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	Button,
	CardMenu,
	IconButton,
	List,
	ListItem} from 'react-mdl'

export default class Jobs extends Component {
	constructor(props) {
		super(props)
		this.state={
			jobs: []
		}
		this.job = new Job()
		this.renderJob = this.renderJob.bind(this)
	}
	
	async componentDidMount() {
		//fetch jobs from firebase and put them on state to acces when rendering
		this.setState({
			jobs: await this.job.getAllJobs()
		})
	}
	
	renderJob(key,job) {
		console.log("renderjob",job,key)
		return (
			<ListItem key={key}>
				<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
					<CardTitle style={{height: '100px'}}>{job.author}</CardTitle>
					<CardText>
						{job.body}
					</CardText>
					<CardActions border>
						<Button colored>Attend</Button>
					</CardActions>
					<CardMenu style={{color: '#fff'}}>
						<IconButton name="share" />
					</CardMenu>
				</Card>
			</ListItem>
		)
	}
	
	render () {
		console.log("state",this.state.jobs)
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

