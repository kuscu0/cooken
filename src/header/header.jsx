import React from "react";
import {SimpleButton} from "../simpleButton/simpleButton";
import {Route, BrowserRouter, Switch, Link} from "react-router-dom";
import "./_header.scss"

export default class Header extends React.Component {
	render() {
		return (
			<BrowserRouter>
			<header>
				<Link to="/" className="logo"><img src="/img/logo.png"/></Link>
				<nav>
					<Link to="/manageIngredients">Manage Inventory</Link>
					<Link to="#">Search</Link>
					<Link to="#">My Recipes</Link>
				</nav>
				<div>
					<Link to="/" className="login"><SimpleButton>Login</SimpleButton></Link>
					<Link to="/register" className="register"><SimpleButton>Register</SimpleButton></Link>
				</div>
			</header>
		</BrowserRouter>
		)
	}
}

