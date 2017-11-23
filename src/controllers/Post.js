import {db} from '../config/constants'
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
    //fetch all data from posts "table"
    let posts = await db.ref(`posts`).once('value')
    return posts.val()
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
    updates['/post-attendees/' + application_details.post_id + '/' + uid] = application_details.text;
    updates['/attendee-posts/' + uid + '/' + application_details.post_id] = application_details.text;
    return db.ref().update(updates);
  }

  acceptUserToPost(post, user) {
  	const updates = {};
    updates['/post-attendees/' + post.id + '/' + user.info.uid + '/status'] = "accepted";    
  	db.ref().update(updates)
  }

  rejectUserToPost(post, user) {
    const updates = {};
    updates['/post-attendees/' + post.id + '/' + user.info.uid + '/status'] = "rejected";    
    db.ref().update(updates)
  }
}
