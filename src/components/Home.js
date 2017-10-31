import React, {Component} from 'react'
import Login from './Login'
import {User} from '../controllers/User'

class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			myData:"nimic",
			loaded: false,
			user: null
		}
		this.user = new User()
	}
	
	handleOnClick = () => {
		this.setState({
			myData: "altceva"
		})
	}
	
	async componentDidMount(){
		// this.user.getCurrentUser().then((user) => {
		// 	console.log("us",user)
		// 	this.setState({
		// 		user: user,
		// 		loaded: true
		// 	})
		// }).catch(err => {
		// 	console.log("err" ,err)
		// 	throw new Error("err" ,err)
		// })
		
		const user = await this.user.getCurrentUser()
		this.setState({
			user:user,
			loaded: true
		})
	}
	
	renderMyData = () => {
		return(
			<div>
				<div>{this.state.user.profile.firstName}</div>
				<button onClick={this.handleOnClick}>btn</button>
				
			</div>
			
		)
	}
	
	render(){
		return(
			
			<div>
				<h1>title</h1>
				{this.state.loaded
					?this.renderMyData()
					:<h4>data is not loaded</h4>
				}
				
				
			</div>
		)
	}
}

export default Home