import "./manageIngrediens.scss";
import React from "react";

export default class ManageIngredients extends React.Component {
	constructor(props) {
		super(props);

		const categories = [];
		for (let i = 0; i < 20; i++) {
			categories.push({ title: "Fruits", imgUrl: "/img/logo.png" });
		}

		this.state = { categories: categories };
	}

	render() {
		return (
			<div className="manageIngredients">
				<h1 className="main-heading">Choose ingredients you'd like to turn into a delicious meal.</h1>
				<div className="tiles">
					{
						this.state.categories.map(category => (
							<div className="tile">
								<img src={ category.imgUrl } className="image" alt={ category.title }/>
								<div className="overlay">
									<div className="text">{ category.title }</div>
								</div>
							</div>
						))
					}
				</div>
				<div className="search">
					<input type="text" name="search" placeholder="Quick Search..."/>
				</div>
			</div>
		);
	}
}
