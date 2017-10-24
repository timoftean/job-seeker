import { firebaseAuth } from '../config/constants'
import { User } from './User'

export class Auth {
	
	authenticate  = (email, pw) => {
		const user = new User()
		return firebaseAuth().createUserWithEmailAndPassword(email, pw)
			.then(user.saveCurrentUser)
	}
	
	logout = () => {
		return firebaseAuth().signOut()
	}
	
	login = (email, pw) => {
		return firebaseAuth().signInWithEmailAndPassword(email, pw)
	}
	
	resetPassword = (email) => {
		return firebaseAuth().sendPasswordResetEmail(email)
	}
	
}
