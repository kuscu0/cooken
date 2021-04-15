import "./RecipeSearch.scss";
import InputText from "../../basics/inputText/InputText";
import DropDown from "../../basics/dropDown/DropDown";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useState} from "react";
import {serverAddress} from "../../globals";
import {getImgSrcFromRecipeData} from "../../utils/utils";

export default function RecipeSearch() {
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ recipeResults, setRecipeResults ] = useState([]);

	async function search() {
		const query = new URLSearchParams({
			query: searchQuery
		});
		const r = await fetch(`${serverAddress}/search?${query.toString()}`);
		const tmpRecipes = await r.json();
		setRecipeResults(
			tmpRecipes.map(recipe => ({
				title: recipe.title,
				img: getImgSrcFromRecipeData(recipe, "s"),
				url: `/recipe/${recipe._id}`
			}))
		);
	}

	return (
		<div className="recipeSearch paddedPage">
			<div className="optionsBar">
				<InputText placeholder="Search..." autoFocus
						   onInput={e => setSearchQuery(e.target.value)}
						   onKeyUp={e => e.code === "Enter" && search()} />
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
				<SimpleButton onClick={search} className="searchButton">Search</SimpleButton>
			</div>
			<div className="results">
				{
					recipeResults.map((recipe, i) => (
						<RecipeTile
							recipeUrl={recipe.url}
							recipeTitle={recipe.title}
							recipeImg={recipe.img}
							key={i}
						/>
					))
				}
			</div>
		</div>
	);
}
