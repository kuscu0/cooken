import "./LoginForm.scss";
import {serverAddress} from "../../globals";
import {useState} from "react";
import SimpleButton from "../../basics/simpleButton/SimpleButton";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		const formParams = new URLSearchParams([
			["email", email],
			["password", password],
		]);

		// const response = await fetch(`${serverAddress}/users/create`, {
		// 	method: "POST",
		// 	mode: "cors",
		// 	body: formParams
		// });
		// const responseData = await response.json;
		// success?
		// if (responseData) {
		//
		// }
	}

	return (
		<form className="registerForm">
			<label htmlFor="registerEmail">E-Mail</label>
			<input type="text" id="registerEmail" onChange={e => setEmail(e.target.value)}/>
			<label htmlFor="registerPassword">Password</label>
			<input type="password" id="registerPassword" onChange={e => setPassword(e.target.value)}/>
			<SimpleButton clicked={login} type="button">Login</SimpleButton>
		</form>
	)
}
