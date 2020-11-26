import React from "react";
import "./registerForm.scss";
import {SimpleButton} from "../../basics/simpleButton/simpleButton";
import {serverAddress} from "../../globals";

export class RegisterForm extends React.Component {

	constructor(props) {
		super(props);

		this.registerUser = this.registerUser.bind(this)

		this.state = {
			username: "",
			email: "",
			password: "",
		}
	}

	render() {
		return (
			<form>
				<label htmlFor="registerUsername">Username</label>
				<input type="text" id="registerUsername" onChange={e => this.setState({ ...this.state, username: e.target.value})}/>
				<label htmlFor="registerEmail">E-Mail</label>
				<input type="text" id="registerEmail" onChange={e => this.setState({ ...this.state, email: e.target.value})}/>
				<label htmlFor="registerPassword">Password</label>
				<input type="password" id="registerPassword" onChange={e => this.setState({ ...this.state, password: e.target.value})}/>
				<SimpleButton clicked={this.registerUser} type="button">Register</SimpleButton>
			</form>
		)
	}

	async registerUser() {
		const formParams = new URLSearchParams([
			["name", this.state.username],
			["email", this.state.email],
			["password", this.state.password],
		]);

		const response = await fetch(`${serverAddress}/users/create`, {
			method: "POST",
			mode: "cors",
			body: formParams
		});
		const responseData = await response.json;
		// success?
		if (responseData) {

		}
	}
}
