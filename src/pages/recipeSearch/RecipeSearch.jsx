import "./RecipeSearch.scss";
import InputText from "../../basics/inputText/InputText";
import DropDown from "../../basics/dropDown/DropDown";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useEffect, useState} from "react";
import {deepClone, serverAddress, useStateCallback} from "../../utils/utils";

export default function RecipeSearch() {
	const [ query, setQuery ] = useStateCallback({
		title: "",
		minRating: 0,
		maxTime: 99999999,
		maxDifficulty: 4
	});
	const [ recipeResults, setRecipeResults ] = useState([]);

	async function search(otherQuery) {
		const urlQuery = new URLSearchParams(otherQuery || query);
		const r = await fetch(`${serverAddress}/search?${urlQuery.toString()}`);
		const tmpRecipes = await r.json();
		setRecipeResults(tmpRecipes);
		const url = new URL(window.location.toString());
		url.search = urlQuery.toString();
		window.history.replaceState(window.history.state, document.title, url.toString())
	}

	useEffect(() => {
		const urlQuery = window.location.search;
		if (!urlQuery)
			return;
		const params = new URLSearchParams(urlQuery);
		const newSearchQuery = deepClone(query);
		for (const param of Object.keys(query)) {
			if (params.get(param))
				newSearchQuery[param] = typeof query[param] === "string" ? params.get(param) : parseInt(params.get(param));
		}
		setQuery(newSearchQuery);
		search(newSearchQuery)
	}, []);

	return (
		<div className="recipeSearch paddedPage">
			<div className="optionsBar">
				<InputText placeholder="Search..." autoFocus
						   value={query.title}
						   onInput={e => setQuery({ ...query, title: e.target.value })}
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
							className={"ratingStar" + (i <= query.minRating ? " active" : "")}
							onClick={() => setQuery({ ...query, minRating: i === query.minRating ? 0 : i })}
							key={i}
						/>
					)}
				</div>
				<div className="maxTime">
					<span>Max Time (Minutes)</span>
					{[15, 30, 45, 60, 90].map(time => (
						<button
							onClick={() => setQuery({ ...query, maxTime: query.maxTime === time ? 0 : time})}
							className={query.maxTime === time ? "active" : ""}
							key={time}
						>{time}</button>
					))}
				</div>
				<div className="difficulty">
					{["Easy", "Medium", "Hard"].map((diff, i) => (
						<button
							onClick={() => setQuery({ ...query, maxDifficulty: query.maxDifficulty === i +1 ? 0 : i + 1 })}
							className={query.maxDifficulty === i + 1 ? "active" : ""}
							key={i}
						>{diff}</button>
					))}
				</div>
				<SimpleButton onClick={() => search()} className="searchButton">Search</SimpleButton>
			</div>
			<div className="results">
				{
					recipeResults.map((recipe, i) => (
						<RecipeTile
							recipeData={recipe}
							key={i}
						/>
					))
				}
			</div>
		</div>
	);
}
