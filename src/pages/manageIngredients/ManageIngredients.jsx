import "./manageIngrediens.scss";
import React from "react";

export default function ManageIngredients() {

	const categories = [];
	const fruits = [];

	categories.push({ title: "Fruits", imgUrl: "/img/fruits.png" });
	categories.push({ title: "Vegetables", imgUrl: "/img/vegetables.png" });
	categories.push({ title: "Meat", imgUrl: "/img/meat.png" });

	for (let i = 0; i < 20; i++) {
		fruits.push({ title: "Orange", imgUrl: "/img/orange.png" });
	}

	const [searchTerm, setSearchTerm] = React.useState("");
	const [searchResults, setSearchResults] = React.useState([]);
	const handleChange = event => {
		setSearchTerm(event.target.value);
	};

	React.useEffect(() => {
		const results = categories.filter(category =>
			category.title.toLowerCase().includes(searchTerm)
		);
		setSearchResults(results);
	}, [searchTerm]);

	return (
		<div className="manageIngredients">
			<h1 className="main-heading">Choose ingredients you'd like to turn into a delicious meal.</h1>
			<div className="tiles">
				{
					searchResults.map(category => (
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
				<input type="text" name="search" placeholder="Quick Search..." autoFocus value={searchTerm} onChange={handleChange}/>
			</div>
		</div>
	);
}
