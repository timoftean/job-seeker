import React, { Component } from 'react'
import { Provider } from '../controllers/Provider'
import {
	Card,
	CardTitle,
	CardText,
	CardActions,
	Button,
	CardMenu,
	IconButton,
	List,
	ListItem} from 'react-mdl'

export default class Providers extends Component {
	constructor(props) {
		super(props)
		this.state={
			providers: []
		}
		this.provider = new Provider()
		this.renderProvider = this.renderProvider.bind(this)
	}

	async componentDidMount() {
		this.provider.saveProvider()
		//fetch providers from firebase and put them on state to acces them when rendering
		this.setState({
			providers: await this.provider.getAllProviders()
		})
	}

	renderProvider(key,provider) {
		console.log("renderprovider",provider,key)
		return (
			<ListItem key={key}>
				<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
					<CardTitle style={{height: '100px'}}>{provider.uid}</CardTitle>
					<CardText>
						{provider.body}
					</CardText>
					<CardActions border>
						<Button colored>Send hire request</Button>
					</CardActions>
					<CardMenu style={{color: '#fff'}}>
						<IconButton name="share" />
					</CardMenu>
				</Card>
			</ListItem>
		)
	}

	render () {
		console.log("state",this.state.providers)
		return (
			<div>
				<h1>Providers</h1>
					<List>
						{
							Object.keys(this.state.providers).map((key) => {
								return this.renderProvider(key,this.state.providers[key])
							})
						}
					</List>
			</div>
		)
	}
}

