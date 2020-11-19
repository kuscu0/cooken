import './App.scss';
import {Component} from "react";
import ManageIngredients from "./manageIngredients/manageIngredients";
import {Route, BrowserRouter, Switch, Link} from "react-router-dom";
import Home from "./home/Home";
import {RegisterForm} from "./registerForm/registerForm";
import Header from "./header/header";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header />
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
