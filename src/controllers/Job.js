import { db } from '../config/constants'
import { User } from './User'

export class Job {
	constructor() {
		this.user = new User()
	}
	saveJob = async (job) => {
		//fetch the logged user
		const user = await this.user.getCurrentUser()
		
		//get his id
		const uid = user.info.uid
		
		//structure job data
		const jobData = {
			author: "test",
			uid: uid,
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ",
			title: "Lorem Ipsum",
		};
		
		//get from firebase the id for the job you want to add
		const newJobKey = db.ref().child('jobs').push().key;
		
		var updates = {};
		//add the job to the new id
		updates['/jobs/' + newJobKey] = jobData;
		//add the same job to the logged in user id
		updates['/user-jobs/' + uid + '/' + newJobKey] = jobData;
		//post data to firebase
		return db.ref().update(updates);
	}
	
	getAllJobs = async () => {
		//fetch all data from jobs "table"
		let jobs = await db.ref(`jobs`).once('value')
		return jobs.val()
	}
}
