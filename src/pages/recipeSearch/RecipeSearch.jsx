import "./RecipeSearch.scss";
import InputText from "../../basics/inputText/InputText";
import DropDown from "../../basics/dropDown/DropDown";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import SimpleButton from "../../basics/simpleButton/simpleButton";

export default function RecipeSearch() {
	return (
		<div className="recipeSearch paddedPage">
			<div className="optionsBar">
				<InputText placeholder="Search..."/>
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
				<SimpleButton className="searchButton">Search</SimpleButton>
			</div>
			<div className="results">
				{
					Array(20).fill({
						title: "Spaghetti Carbonara",
						img: "/img/carbonara.jpg",
						url: "/recipe"
					}).map(recipe => (
						<RecipeTile recipeUrl={recipe.url} recipeTitle={recipe.title} recipeImg={recipe.img}/>
					))
				}
			</div>
		</div>
	);
}
