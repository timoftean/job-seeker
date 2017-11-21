import { firebaseAuth, provider } from '../config/constants'
import { User } from './User'

export class Auth {
	
	constructor() {
		this.user = new User()
	}
	
	authenticate = (email, pw) => {
		return firebaseAuth().createUserWithEmailAndPassword(email, pw)
			.then(this.user.saveCurrentUser)
	}
	
	loginWithGoogle = () => {
		return firebaseAuth().signInWithPopup(provider).then(this.user.saveCurrentUser)
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
