import { db } from '../config/constants'
import { User } from './User'

export class Provider {
	
	constructor() {
		this.user = new User()
	}
	
	saveProvider = async (provider) => {
		//fetch the logged user
		const user = await this.user.getCurrentUser()
		
		//get his id
		const uid = user.info.uid
		
		//structure job data
		const providerData = {
			uid: uid,
			category: provider.category,
			location: provider.location,
			noHours: provider.noHours,
			availability: provider.availability,
			description: provider.description
		};
		
		//get from firebase the id for the provider you want to add
		const newProviderKey = db.ref().child('providers').push().key
		
		var updates = {}
		updates['users/' + uid + '/info/isProvider'] = 1
		//add the provider to the new id
		updates['/providers/' + newProviderKey] = providerData
		//add the same job to the logged in user id
		updates['/user-providers/' + uid + '/' + newProviderKey] = providerData
		//post data to firebase
		return db.ref().update(updates);
	}
	
	getAllProviders = async () => {
		//fetch all data from providers "table"
		let providers = await db.ref(`providers`).once('value')
		return providers.val()
	}
}
