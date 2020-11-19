import "./manageIngrediens.scss";
import React from "react";

export default class ManageIngredients extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1 className="main-heading">Choose ingredients you'd like to turn into a delicious meal.</h1>
				<div className="tiles">
					<div className="tile">
						<img src="/img/logo.png" className="image" alt="Fruits"/>
						<div className="overlay">
							<div className="text">Fruits</div>
						</div>
					</div>
					<div className="tile">
						<img src="/img/logo.png" className="image" alt="Vegetables"/>
						<div className="overlay">
							<div className="text">Vegetables</div>
						</div>
					</div>
					<div className="tile">
						<img src="/img/logo.png" className="image" alt="Meat"/>
						<div className="overlay">
							<div className="text">Meat</div>
						</div>
					</div>
					<div className="tile">
						<img src="/img/logo.png" className="image" alt="Fruits"/>
						<div className="overlay">
							<div className="text">Fruits</div>
						</div>
					</div>
					<div className="tile">
						<img src="/img/logo.png" className="image" alt="Vegetables"/>
						<div className="overlay">
							<div className="text">Vegetables</div>
						</div>
					</div>
					<div className="tile">
						<img src="/img/logo.png" className="image" alt="Meat"/>
						<div className="overlay">
							<div className="text">Meat</div>
						</div>
					</div>
				</div>
				<form>
					<input type="text" name="search" placeholder="Quick Search..."/>
				</form>
			</div>
		);
	}
}
