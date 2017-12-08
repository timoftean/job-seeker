import firebase from 'firebase'

const apiUrls = {
  'development': 'http://localhost:5002/return-to-sleep/us-central1/app',
  'production': 'https://us-central1-return-to-sleep.cloudfunctions.net/app'
}

const config = {
	apiKey: "AIzaSyD0dv0jHJOAx2QsgTAN28vOREmYqxXoFck",
	authDomain: "return-to-sleep.firebaseapp.com",
	databaseURL: "https://return-to-sleep.firebaseio.com",
	projectId: "return-to-sleep",
	storageBucket: "return-to-sleep.appspot.com",
	messagingSenderId: "82587628686"
};

firebase.initializeApp(config)

export const db = firebase.database()
export const firebaseAuth = firebase.auth
export const storageRef = firebase.storage().ref();
export const provider = new firebase.auth.GoogleAuthProvider();

export const apiUrl = apiUrls[process.env.NODE_ENV]