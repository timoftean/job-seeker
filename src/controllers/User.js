import { db, firebaseAuth, storageRef } from '../config/constants'

export class User {
	
	saveCurrentUser = async () => {
    const user = await this.getLoggedUser()
		return db.ref().child(`users/${user.uid}/info`)
			.set({
				email: user.email,
				uid: user.uid
			})
			.then(() => user)
	}
	
	saveUserProfile = async (user) => {
		const uid = await this.getCurrentUserId();
        let categories = { };
		let reviews = await this.getUserReviews();
        let selectedCategories = user.categories;
        selectedCategories.map( (item, index) => {
            return categories[index] = item
        });
		return db.ref().child(`users/${uid}/profile`)
			.set({
				phone: user.phone,
				firstName: user.firstName,
				lastName: user.lastName,
                categories : categories,
				reviews: reviews
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
  
  getPictureByUserId = async (id) => {
    try{
      const pictureRef = storageRef.child(`images/${id}/profilePicture.jpg`);
      // Get the download URL
      return await pictureRef.getDownloadURL()
    }catch(err) {
      console.log("Err",err)
      return err
    }
	}
	
	getPictureUrl = async () => {
		const uid = await this.getCurrentUserId()
		try{
			const pictureRef = storageRef.child(`images/${uid}/profilePicture.jpg`);
			// Get the download URL
			return await pictureRef.getDownloadURL()
		}catch(err) {
			console.log("Err",err)
			return err
		}
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
	
	getLoggedUser = async () => {
    return await firebaseAuth().currentUser
	}
	
	getCurrentUserId = async () => {
		const user = await firebaseAuth().currentUser
		return  user ? user.uid : null
	}
	
	async getUserReviews() {
		const uid = await this.getCurrentUserId()
		let reviews = await db.ref(`user-reviews/${uid}`).once('value')
		return reviews.val()
	}
	
	async setUserReview(review, uid) {		
		const updates = {}
		const newReviewKey = db.ref().child('/user-reviews/' + uid).push().key
		updates['/user-reviews/' + uid + '/' + newReviewKey ] = review
		
		return db.ref().update(updates)
	}
	
	saveProfilePicture = async (imageString) => {
		const uid = await this.getCurrentUserId()
		
		// Base64 formatted string
		const ref = storageRef.child(`images/${uid}/profilePicture.jpg`);
		return await ref.putString(imageString, 'data_url')
	}

    async getCategories() {
        let categories = await db.ref('categories').once('value');
        return categories.val()
    }

}
