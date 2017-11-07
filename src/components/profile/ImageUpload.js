import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { User } from '../../controllers/User'
export default class ImageUpload extends Component {
	
	constructor() {
		super()
		this.state = {
			files: []
		}
		this.userController = new User()
	}
	
	// Callback~
	getFiles = async (files) => {
		await this.userController.saveProfilePicture(files[0].base64)
		this.setState({ files: files })
	}
	
	render() {
		return (
			<FileBase64
				multiple={ true }
				onDone={ this.getFiles } />
		)
	}
	
}
