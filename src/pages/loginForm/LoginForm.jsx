import "./LoginForm.scss";
import {useContext, useState} from "react";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import {IsLoggedInContext} from "../../context/IsLoggedInContext";
import {useHistory} from "react-router-dom";
import {serverAddress} from "../../utils/utils";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);
	const history = useHistory();

	async function login() {
		const formParams = new URLSearchParams([
			["email", email],
			["password", password],
		]);
		const response = await fetch(`${serverAddress}/auth/login`, {
			method: "POST",
			mode: "cors",
			body: formParams
		});
		if (response.status !== 200) {
			setIsLoggedIn(false);
			throw "Failed Login";		// TODO display error
		}
		const responseData = await response.json();
		localStorage.token = responseData.token;
		setIsLoggedIn(true);
		history.push("/");
	}

	return (
		<form className="userForm">
			<label htmlFor="registerEmail">E-Mail</label>
			<input type="text" autoComplete="email" id="registerEmail" onChange={e => setEmail(e.target.value)}/>
			<label htmlFor="registerPassword">Password</label>
			<input type="password" autoComplete="password" id="registerPassword" onChange={e => setPassword(e.target.value)}/>
			<SimpleButton onClick={login} type="button">Login</SimpleButton>
		</form>
	)
}
