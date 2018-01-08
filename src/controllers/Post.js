import {db} from '../config/constants'
import {apiUrl} from "../config/constants"
import {User} from './User'

export class Post {
  constructor() {
    this.user = new User()
  }
  
  getPostById = async (id) => {
	  const post = await db.ref(`posts/${id}`).once('value')
	  const loggedInUser = await this.user.getCurrentUserId()
	  const user = await this.user.getUserById(post.val().userId)
    const postAttendees = await db.ref(`post-attendees/${id}`).once('value')
    const attendees = postAttendees.val() !== null
      ? await Promise.all(Object.keys(postAttendees.val()).map(key => {
          return this.user.getUserById(key)
        }))
      : []

    const statuses = postAttendees.val() !== null
      ? await Promise.all(Object.keys(postAttendees.val()).map(elem => {
        let tmp = {}
        tmp[elem] = postAttendees.child(elem).val().status
        return tmp;
      }))
      : []

	  return {
  		user,
		  post: post.val(),
      attendees: attendees,
		  loggedInUser,
      statuses,
	  }
	}

	async getPostsByHiredUser(userId) {
		const posts = await db.ref('post-attendees').once('value')
		const postsValue = posts.val()
		
		const result = []

		for (let p in postsValue) {
			for (let u in postsValue[p]) {
				if (u === userId) {
					let temp = {}
					temp[p] = postsValue[p]
					result.push(temp)
				}
			}
		}
		return result
	}
	
	async removePost(postId) {
		const user = await this.user.getCurrentUser();
		const uid = user.info.uid;
    await db.ref('user-posts/'+uid+'/'+postId).remove();
    return db.ref('posts/'+postId).remove();
  }
  
	async editPost(id,post) {
		//fetch the logged user
		const user = await this.user.getCurrentUser();
		
		//get his id
		const uid = user.info.uid;
		
		//assign the userId on the post
		Object.assign(post,{userId: uid})
	
		var updates = {};
		//add the post to the new id
		updates['/posts/' + id] = post
		//add the same post to the logged in user id
		updates['/user-posts/' + uid + '/' + id] = post
		//post data to firebase
		return db.ref().update(updates)
	}
	
  async savePost(post) {
    //fetch the logged user
    const user = await this.user.getCurrentUser();

    //get his id
    const uid = user.info.uid;
    
	  //assign the userId on the post
	  Object.assign(post,{userId: uid})

    //get from firebase the id for the post you want to add
    const newPostKey = db.ref().child('posts').push().key

    var updates = {}
	  updates['users/' + uid + '/info/hasPostedPost'] = 1
    //add the post to the new id
    updates['/posts/' + newPostKey] = post
    //add the same post to the logged in user id
    updates['/user-posts/' + uid + '/' + newPostKey] = post
    //post data to firebase
    return db.ref().update(updates)
  }

  async getAllPosts() {
    console.log("APIURL",apiUrl)
    const response = await fetch(`${apiUrl}/posts/`)
    return await response.json()
  }
	
	async getUserPosts() {
    const uid = await this.user.getCurrentUserId()
		
		let posts = await db.ref(`user-posts/${uid}`).once('value')
		return posts.val()
	}

	async getCategories() {
		let categories = await db.ref('categories').once('value')
		return categories.val()
	}

  async addUserToPost(application_details) {
    const user = await this.user.getCurrentUser();
    const uid = user.info.uid;

    const updates = {};
    updates['/post-attendees/' + application_details.post_id + '/' + uid] = {
      reason: application_details.text,
      status: 'pending'
    }
    updates['/attendee-posts/' + uid + '/' + application_details.post_id] = {
      reason: application_details.text,
      status: 'pending'
    }
    return db.ref().update(updates);
  }

  acceptUserToPost(post, user) {
  	const updates = {};
    updates['/post-attendees/' + post.id + '/' + user.info.uid + '/status'] = "accepted";
    updates['/attendee-posts/' + user.info.uid + '/' + post.id + '/status'] = "accepted";
    const notification = {
      'jobStatus' : 'accepted',
      'job' : post,
      'seen' : false,
      'userToNotify' : user.info.uid,
    }
    db.ref('/notifications').push(notification)
  	return db.ref().update(updates)
  }

  rejectUserToPost(post, user) {
    const updates = {};
    updates['/post-attendees/' + post.id + '/' + user.info.uid + '/status'] = "rejected";
    updates['/attendee-posts/' + user.info.uid + '/' + post.id  + '/status'] = "rejected";
    const notification = {
      'jobStatus' : 'rejected',
      'job' : post,
      'seen' : false,
      'userToNotify' : user.info.uid,
    }
    db.ref('/notifications').push(notification)
    return db.ref().update(updates)
  }

  async getNotificationsForUser() {
    let notifications = await db.ref('/notifications').once('value')
    const uid = await this.user.getCurrentUserId()
    let array = Object.keys(notifications.val()).map(key => {
      return {'notification' : notifications.val()[key], 'key' : key}
    })
    const notificationsForUser = array.filter((x) => {
      if (x.notification.userToNotify === uid) return true
      return false
    })
    return notificationsForUser
  }

  async getNotificationsForUserCount() {
    let notifications = await this.getNotificationsForUser()
    let unseen = notifications.filter((x) => {
      return x.notification.seen === true ? false : true
    })
    return unseen.length
  }
}
