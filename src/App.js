import './App.scss';
import React, {Component} from "react";
import ManageIngredients from "./manageIngredients/manageIngredients";
import {Route, BrowserRouter, Switch, Link} from "react-router-dom";
import Home from "./home/Home";
import {RegisterForm} from "./registerForm/registerForm";
import Header from "./header/header";
import {SimpleButton} from "./simpleButton/simpleButton";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
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
					<main>
						<Switch>
							<Route path="/manageIngredients" component={ManageIngredients}/>
							<Route path="/register" component={RegisterForm}/>
							<Route path="/" component={Home}/>
						</Switch>
					</main>

				</div>
			</BrowserRouter>
		);
	}
}

export default App;
