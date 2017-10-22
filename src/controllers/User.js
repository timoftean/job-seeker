import { db, firebaseAuth } from '../config/constants'

export class User {
	
	saveCurrentUser(user) {
		return db.ref().child(`users/${user.uid}/info`)
			.set({
				email: user.email,
				uid: user.uid
			})
			.then(() => user)
	}
	
	async getCurrentUser() {
		const loggedUser = await firebaseAuth().currentUser
		let userInfo = {}
		if (loggedUser) {
			userInfo = await db.ref(`users/${loggedUser.uid}`).once('value').then((snapshot) => {
				return snapshot.val() || {}
			});
		}
		console.log("user info",userInfo)
		return userInfo
	}
}
