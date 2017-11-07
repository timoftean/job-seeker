import { db, firebaseAuth, storageRef } from '../config/constants'

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
			.then((user) => user)
	}
	
	getUserByPostId = async (id) => {
		const post = await db.ref(`posts/${id}`).once('value')
		const user = await this.getUserById(post.val().userId)
		return user
	}
	
	getUserById = async (id) => {
		const userInfo = await db.ref(`users/${id}`).once('value')
		return userInfo.val()
	}
	
	setPicturePath = async (path) => {
		const uid = await this.getCurrentUserId()
		return db.ref().child(`users/${uid}/picture`)
			.set({
				picturePath: `gs://return-to-sleep.appspot.com/${path}`
			})
			.then((res) => res)
	}
	
	getPictureUrl = async () => {
		const uid = await this.getCurrentUserId()
		const pictureRef = storageRef.child(`images/${uid}/profilePicture.jpg`);
		// Get the download URL
		return await pictureRef.getDownloadURL()
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
		const user = await firebaseAuth().currentUser
		return  user ? user.uid : null
	}
	
	saveProfilePicture = async (imageString) => {
		const uid = await this.getCurrentUserId()
		
		// Base64 formatted string
		const ref = storageRef.child(`images/${uid}/profilePicture.jpg`);
		return await ref.putString(imageString, 'data_url')
	}
}
