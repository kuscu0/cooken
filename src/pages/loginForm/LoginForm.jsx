import "./LoginForm.scss";
import {serverAddress} from "../../globals";
import {useContext, useState} from "react";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import {IsLoggedInContext} from "../../context/IsLoggedInContext";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);

	async function login() {
		const formParams = new URLSearchParams([
			["email", email],
			["password", password],
		]);
		setIsLoggedIn(true);
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
		<form className="userForm">
			<label htmlFor="registerEmail">E-Mail</label>
			<input type="text" autoComplete="email" id="registerEmail" onChange={e => setEmail(e.target.value)}/>
			<label htmlFor="registerPassword">Password</label>
			<input type="password" autoComplete="password" id="registerPassword" onChange={e => setPassword(e.target.value)}/>
			<SimpleButton clicked={login} type="button">Login</SimpleButton>
		</form>
	)
}
