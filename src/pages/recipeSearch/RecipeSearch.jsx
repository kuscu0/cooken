import "./RecipeSearch.scss";
import InputText from "../../basics/inputText/InputText";
import DropDown from "../../basics/dropDown/DropDown";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useState} from "react";
import {getImgSrcFromRecipeData, serverAddress} from "../../utils/utils";

export default function RecipeSearch() {
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ recipeResults, setRecipeResults ] = useState([]);
	const [ rating, setRating ] = useState(-1);
	const [ maxTime, setMaxTime ] = useState(0);
	const [ maxDifficulty, setMaxDifficulty ] = useState(0);

	async function search() {
		const query = new URLSearchParams({
			title: searchQuery
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
				<div className="ratingFilter">
					{ Array(5).fill(0).map(
						(_, i) => <button
							className={"ratingStar" + (i <= rating ? " active" : "")}
							onClick={() => setRating(i === rating ? -1 : i)}
							key={i}
						/>
					)}
				</div>
				<div className="maxTime">
					<span>Max Time (Minutes)</span>
					{[15, 30, 45, 60, 90].map(time => (
						<button
							onClick={() => setMaxTime(maxTime === time ? 0 : time)}
							className={maxTime === time ? "active" : ""}
							key={time}
						>{time}</button>
					))}
				</div>
				<div className="difficulty">
					{["Easy", "Medium", "Hard"].map((diff, i) => (
						<button
							onClick={() => setMaxDifficulty(maxDifficulty === i +1 ? 0 : i + 1)}
							className={maxDifficulty === i +1 ? "active" : ""}
							key={i}
						>{diff}</button>
					))}
				</div>
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
