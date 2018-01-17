import React, { Component } from 'react'
import { Card, CardTitle, CardText, Button, CardActions, List, ListItem } from 'react-mdl'
import { User } from '../../controllers/User'
import ReviewItem from "./ReviewItem";

class UserPublicProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      pictureUrl: null,
	  reviews: null,
      user: this.props
    }
    this.userController = new User()
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({user:nextProps.user})
  }
  
  async componentDidMount() {
    const { id } = this.props.match.params
	const rev = await this.userController.getPublicUserReviews(id)
	this.setState({reviews:rev})
	// console.log(this.state.reviews)
    this.userController.getUserById(id)
      .then( user => {
        this.userController.getPictureByUserId(id)
          .then(res => {
            if(res.code && res.code === "storage/object-not-found") {
              this.setState({loaded: true, user})
            } else {
              this.setState({pictureUrl:res, loaded: true, user})
            }
          })
          .catch((error) => {
            switch (error.code) {
              case 'storage/object_not_found':
                console.log("File does not exists")
                this.setState({loaded: true})
                break;
              case 'storage/unauthorized':
                console.log("Unauthorized")
                this.setState({loaded: true})
                break;
              default:
                break;
            }
          })
      })
  }
  
  getStyle = () => {
    return this.state.pictureUrl !== null
      ?{
        color: '#fff',
        height: '300px',
        background: `url(${this.state.pictureUrl}) center / cover`
      }
      :{
        color: 'black',
        height: '70px',
      }
  }
  
  render() {
    if (!this.state.loaded) return null
    const { user } = this.state
    return (
      <Card shadow={0} style={{width: '600px',minHeight:'0', margin: 'auto'}}>
        <CardTitle style={this.getStyle()}>
          <div>
            {user.profile.firstName} {user.profile.lastName}
          </div>
        </CardTitle>
        <CardText>
          <div>
            {user.info.email}
          </div>
        </CardText>
		<CardText>
			<List>
				{ this.state.reviews ? 
					Object.keys(this.state.reviews).map((reviewKey) => {
						return (<ListItem key={reviewKey}>
								<ReviewItem description={this.state.reviews[reviewKey].description}
											rating={this.state.reviews[reviewKey].rating}
											{...this.props}/>
								</ListItem>
						)
					}) :null }
			</List>
		</CardText>
        <CardActions>
          <a href={"mailto:?subject=JobSeeker - New user recommendation! &body=You have a new profile recommendation for: \n\n " + window.location.href}>
            <Button raised>
              SHARE! 
            </Button>
          </a>
        </CardActions>
      </Card>
    )
  }
}

export default UserPublicProfile
