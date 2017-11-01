import {db} from '../config/constants'
import {User} from './User'

export class Post {
  constructor() {
    this.user = new User()
  }
  
	async removePost(postId) {
		const user = await this.user.getCurrentUser();
		const uid = user.info.uid;
    await db.ref('user-posts/'+uid+'/'+postId).remove();
    return db.ref('posts/'+postId).remove();
  }
  
	async editPost(post) {
		//fetch the logged user
		const user = await this.user.getCurrentUser();
		
		//get his id
		const uid = user.info.uid;
		
		//structure post data
		const postData = {
			type: post.title,
			title: post.title,
			description: post.description,
			category: post.category,
			location: post.location,
			numHours: post.numHours,
			timeInterval: post.timeInterval,
			price: post.price
		}
		
		var updates = {};
		//add the post to the new id
		updates['/posts/' + post.id] = postData
		//add the same post to the logged in user id
		updates['/user-posts/' + uid + '/' + post.id] = postData
		//post data to firebase
		return db.ref().update(updates)
	}
	
  async savePost(post) {
    //fetch the logged user
    const user = await this.user.getCurrentUser();

    //get his id
    const uid = user.info.uid;

    //structure post data
	  const postData = {
		  type: post.title,
		  title: post.title,
		  description: post.description,
		  category: post.category,
		  location: post.location,
		  numHours: post.numHours,
		  timeInterval: post.timeInterval,
		  price: post.price
	  }

    //get from firebase the id for the post you want to add
    const newPostKey = db.ref().child('posts').push().key

    var updates = {}
	  updates['users/' + uid + '/info/hasPostedPost'] = 1
    //add the post to the new id
    updates['/posts/' + newPostKey] = postData
    //add the same post to the logged in user id
    updates['/user-posts/' + uid + '/' + newPostKey] = postData
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
		
		let posts = await db.ref(`user-posts/${uid}`).once('value').then((posts) => {
			return posts.val() || []
		});
		return posts
	}
}
