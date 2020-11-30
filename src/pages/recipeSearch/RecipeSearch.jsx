import "./RecipeSearch.scss";
import InputText from "../../basics/inputText/InputText";
import DropDown from "../../basics/dropDown/DropDown";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import SimpleButton from "../../basics/simpleButton/simpleButton";
import React from "react";

export default function RecipeSearch() {

	const recipes = [];

	for (let i = 0; i < 20; i++) {
		recipes.push({ title: "Spaghetti Carbonara", img: "/img/carbonara.jpg", url: "/recipe" });
	}

	const [searchTerm, setSearchTerm] = React.useState("");
	const [searchResults, setSearchResults] = React.useState([]);
	const handleChange = event => {
		setSearchTerm(event.target.value);
	};

	React.useEffect(() => {
		const results = recipes.filter(recipe =>
			recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSearchResults(results);
	}, [searchTerm]);

	return (
		<div className="recipeSearch">
			<div className="optionsBar">
				<InputText placeholder="Search..." autoFocus value={searchTerm} onChange={handleChange}/>
				<DropDown
					expanderChildren={
						<div>Must use</div>
					}
					dropDownChildren={
						<div>
							<div>Milk</div>
							<div>Cheese</div>
						</div>
					}
				/>
			</div>
			<div className="results">
				{
					searchResults.map(recipe => (
						<RecipeTile recipeUrl={recipe.url} recipeTitle={recipe.title} recipeImg={recipe.img}/>
					))
				}
			</div>
		</div>
	);
}
