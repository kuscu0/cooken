import "./registerForm.scss";
import {serverAddress} from "../../globals";
import {useState} from "react";
import SimpleButton from "../../basics/simpleButton/simpleButton";

export default function RegisterForm() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser() {
		const formParams = new URLSearchParams([
			["name", username],
			["email", email],
			["password", password],
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

	return (
		<form>
			<label htmlFor="registerUsername">Username</label>
			<input type="text" id="registerUsername" onChange={e => setUsername(e.target.value)}/>
			<label htmlFor="registerEmail">E-Mail</label>
			<input type="text" id="registerEmail" onChange={e => setEmail(e.target.value)}/>
			<label htmlFor="registerPassword">Password</label>
			<input type="password" id="registerPassword" onChange={e => setPassword(e.target.value)}/>
			<SimpleButton clicked={registerUser} type="button">Register</SimpleButton>
		</form>
	)
}
