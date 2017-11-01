import { db, firebaseAuth } from '../config/constants'

export class User {
	
	saveCurrentUser = (user) => {
		return db.ref().child(`users/${user.uid}/info`)
			.set({
				email: user.email,
				uid: user.uid
			})
			.then(() => user)
	}
	
	saveUserProfile = async (user) => {
		const uid = await this.getCurrentUserId()
		return db.ref().child(`users/${uid}/profile`)
			.set({
				phone: user.phone,
				firstName: user.firstName,
				lastName: user.lastName
			})
			.then(() => user)
	}
	
	getCurrentUser = async () => {
		const loggedUser = await firebaseAuth().currentUser
		let userInfo
		if (loggedUser) {
			userInfo = await db.ref(`users/${loggedUser.uid}`).once('value')
			return userInfo.val()
		}
		return userInfo
	}
	
	getCurrentUserId = async () => {
		return  await firebaseAuth().currentUser.uid
	}
}
