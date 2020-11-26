import './App.scss';
import React, {Component} from "react";
import ManageIngredients from "./pages/manageIngredients/manageIngredients";
import {Route, BrowserRouter, Switch, Link} from "react-router-dom";
import Home from "./pages/home/Home";
import RecipeSearch from "./pages/recipeSearch/RecipeSearch";
import MyProfile from "./pages/MyProfile/MyProfile";
import Recipe from "./pages/recipe/Recipe";
import SimpleButton from "./basics/simpleButton/simpleButton";
import RegisterForm from "./pages/registerForm/registerForm";

export default function App() {
	function onNavClick(e) {
		Array.from(e.currentTarget.parentElement.children).forEach(el => el.classList.remove("current"));
		e.currentTarget.classList.add("current");
	}

	return (
		<BrowserRouter>
			<div className="App">
				<header>
					<Link to="/" className="logo"><img src="/img/logo.png" alt="logo"/></Link>
					<nav>
						<Link to="/manageIngredients" onClick={onNavClick}>Manage Inventory</Link>
						<Link to="/recipeSearch" onClick={onNavClick}>Search</Link>
						<Link to="/myProfile" onClick={onNavClick}>My Profile</Link>
					</nav>
					<div>
						<Link to="/login" className="login"><SimpleButton>Login</SimpleButton></Link>
						<Link to="/register" className="register"><SimpleButton>Register</SimpleButton></Link>
					</div>
				</header>
				<main>
					<Switch>
						<Route path="/manageIngredients" component={ManageIngredients}/>
						<Route path="/recipeSearch" component={RecipeSearch}/>
						<Route path="/myProfile" component={MyProfile}/>
						<Route path="/recipe" component={Recipe}/>
						<Route path="/register" component={RegisterForm}/>
						<Route path="/" component={Home}/>
					</Switch>
				</main>
			</div>
		</BrowserRouter>
	);
}