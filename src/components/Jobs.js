import React, { Component } from 'react'
import { Job } from '../controllers/Job'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.job = new Job()
	}
	async componentWillMount() {
		await this.job.saveJob()
		const jobs = await this.job.getAllJobs()
		console.log("JOBSS",jobs)
		
	}
	render () {
		return (
			<div>
				Jobs. Not Protected. Anyone can see this.
			</div>
		)
	}
}
