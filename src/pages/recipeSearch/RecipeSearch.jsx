import "./RecipeSearch.scss";
import InputText from "../../basics/inputText/InputText";
import DropDown from "../../basics/dropDown/DropDown";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useEffect, useState, useContext} from "react";
import {deepClone, serverAddress, useStateCallback} from "../../utils/utils";
import {myIngredientsContext} from "../../context/myIngredientsContext";

export default function RecipeSearch() {
	const [ query, setQuery ] = useStateCallback({
		title: "",
		minRating: -1,
		maxTime: 99999999,
		maxDifficulty: 4,
		page: 0,
		onlyFromMyIngredients: false
	});
	const [ recipeResults, setRecipeResults ] = useState([]);
	const [myIngredients] = useContext(myIngredientsContext);

	async function search(otherQuery) {
		const searchQuery = otherQuery || query;
		if (searchQuery.onlyFromMyIngredients)
			searchQuery.myIngredients = myIngredients;

		const r = await fetch(`${serverAddress}/search`, {
			method: "POST",
			headers: [
				["Content-Type", "application/json"]
			],
			body: JSON.stringify(searchQuery)
		});
		const tmpRecipes = await r.json();
		setRecipeResults(tmpRecipes);
		const url = new URL(window.location.toString());
		url.search = JSON.stringify(query);
		window.history.replaceState(window.history.state, document.title, url.toString())
	}

	useEffect(() => {
		let urlQuery;
		try {
			urlQuery = JSON.parse(decodeURIComponent(window.location.search.slice(1)));
		}
		catch {
			return;
		}
		if ("myIngredients" in urlQuery)
			delete urlQuery.myIngredients;
		setQuery(urlQuery);
		search(urlQuery);
	}, []);

	function setSearchPage(newPage) {
		newPage = Math.max(0, newPage);
		const newQuery = {...query, page: newPage};
		setQuery(newQuery);
		search(newQuery);
	}

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
				<input
					id="onlyFromMyIngredientsCheckbox" type="checkbox"
					checked={query.onlyFromMyIngredients}
					onChange={e => {
						console.log(e.currentTarget.value)
						setQuery({...query, onlyFromMyIngredients: e.currentTarget.checked});
					}}
				/>
				<label htmlFor="onlyFromMyIngredientsCheckbox">Only with my ingredients</label>
				<div className="ratingFilter">
					{ Array(5).fill(0).map(
						(_, i) => <button
							className={"ratingStar" + (i <= query.minRating ? " active" : "")}
							onClick={() => setQuery({ ...query, minRating: i === query.minRating ? -1 : i })}
							key={i}
						/>
					)}
				</div>
				<div className="maxTime">
					<span>Max Time (Minutes)</span>
					{[15, 30, 45, 60, 90].map(time => (
						<button
							onClick={() => setQuery({ ...query, maxTime: query.maxTime === time ? 9999999 : time})}
							className={query.maxTime === time ? "active" : ""}
							key={time}
						>{time}</button>
					))}
				</div>
				<div className="difficulty">
					{["Easy", "Medium", "Hard"].map((diff, i) => (
						<button
							onClick={() => setQuery({ ...query, maxDifficulty: query.maxDifficulty === i +1 ? 4 : i + 1 })}
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
			<div className="paginationBar">
				<SimpleButton
					onClick={() => setSearchPage(query.page - 1)} disabled={query.page === 0}
				>Back</SimpleButton>
				<div>Page {query.page + 1}</div>
				<SimpleButton
					onClick={() => setSearchPage(query.page + 1)} disabled={recipeResults.length < 20}
				>Next</SimpleButton>
			</div>
		</div>
	);
}
