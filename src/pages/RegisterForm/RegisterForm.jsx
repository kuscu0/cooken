import "./RegisterForm.scss";
import {serverAddress} from "../../globals";
import {useState} from "react";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import { useHistory } from "react-router-dom";

export default function RegisterForm() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	async function registerUser() {
		const formParams = new URLSearchParams([
			["name", username],
			["email", email],
			["password", password],
		]);

		const response = await fetch(`${serverAddress}/users`, {
			method: "PUT",
			mode: "cors",
			body: formParams
		});
		const responseData = await response.text();
		if (responseData === "success") {
			history.push("/login");
		}
	}

	return (
		<form className="userForm">
			<label htmlFor="registerUsername">Username</label>
			<input type="text" autoComplete="username" id="registerUsername" onChange={e => setUsername(e.target.value)}/>
			<label htmlFor="registerEmail">E-Mail</label>
			<input type="text" autoComplete="email" id="registerEmail" onChange={e => setEmail(e.target.value)}/>
			<label htmlFor="registerPassword">Password</label>
			<input type="password" autoComplete="password" id="registerPassword" onChange={e => setPassword(e.target.value)}/>
			<SimpleButton clicked={registerUser} type="button">Register</SimpleButton>
		</form>
	)
}
