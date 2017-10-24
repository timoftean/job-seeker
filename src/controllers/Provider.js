import { db } from '../config/constants'
import { User } from './User'

export class Provider {
	
	constructor() {
		this.user = new User()
	}
	
	saveProvider = async (job) => {
		//fetch the logged user
		const user = await this.user.getCurrentUser()
		
		//get his id
		const uid = user.info.uid
		
		//structure job data
		const providerData = {
			uid: uid,
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ",
			title: "Lorem Ipsum",
		};
		
		//get from firebase the id for the provider you want to add
		const newProviderKey = db.ref().child('jobs').push().key;
		
		var updates = {};
		//add the job to the new id
		updates['/providers/' + newProviderKey] = providerData;
		//add the same job to the logged in user id
		updates['/user-providers/' + uid + '/' + newProviderKey] = providerData;
		//post data to firebase
		return db.ref().update(updates);
	}
	
	getAllProviders =async () => {
		//fetch all data from providers "table"
		let providers = await db.ref(`providers`).once('value')
		return providers.val()
	}
}
