import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyD0dv0jHJOAx2QsgTAN28vOREmYqxXoFck",
	authDomain: "return-to-sleep.firebaseapp.com",
	databaseURL: "https://return-to-sleep.firebaseio.com",
	projectId: "return-to-sleep",
	storageBucket: "",
	messagingSenderId: "82587628686"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth