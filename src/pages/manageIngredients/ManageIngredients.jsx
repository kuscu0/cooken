import "./ManageIngrediens.scss";
import React, {useContext, useEffect} from "react";
import {authFetch, isLoggedIn, serverAddress} from "../../utils/utils";
import {myIngredientsContext} from "../../context/myIngredientsContext";
import {IsLoadingContext} from "../../context/IsLoadingContext";

export default function ManageIngredients() {
	const [categories, setCategories] = React.useState([]);
	const [selectedCategory, setSelectedCategory] = React.useState("");
	const [allIngredients, setAllIngredients] = React.useState([]);
	const [searchableIngredients, setSearchableIngredients] = React.useState([]);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [selectedIngredients, setSelectedIngredients] = React.useContext(myIngredientsContext);
	const forceUpdate = React.useReducer(() => ({}))[1]
	const [, setIsLoading] = useContext(IsLoadingContext);


	useEffect(() => {
		setIsLoading(true);
		const getGroups = fetch(`${serverAddress}/recipe/ingredientGroups`).then(async response => {
			const ingredientGroups = await response.json();
			setCategories(ingredientGroups.ingredientGroups);
			const allIngredients = ingredientGroups.ingredientGroups.map(group => group.ingredients).flat();
			setAllIngredients(allIngredients);
			setSearchableIngredients(allIngredients);
		});
		let getInventory;
		if (isLoggedIn())
			getInventory = authFetch("/users/inventory", true).then(inventory => setSelectedIngredients(inventory));
		Promise.all([getGroups, getInventory]).then(() => setIsLoading(false));
	}, []);

	function handleSearchChange(event) {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);
	}

	function toggleSelectCategory(event) {
		const clickedCategory = event.currentTarget.getAttribute("data-category");
		if (clickedCategory === selectedCategory) {
			setSelectedCategory(null);
			setSearchableIngredients(allIngredients);
		}
		else {
			setSelectedCategory(clickedCategory);
			const categoryIngredients = categories.find(category => category._id === clickedCategory).ingredients;
			setSearchableIngredients(categoryIngredients);
		}
	}

	async function toggleSelectedIngredient(event) {
		setIsLoading(true);
		const isAdded = event.currentTarget.classList.contains("added");
		const ingredientId = event.currentTarget.getAttribute("data-ingredient-id");
		if (isLoggedIn()) {
			await authFetch(
				"/users/inventory", false,
				{
					method: isAdded ? "DELETE" : "PUT",
					body: new URLSearchParams([["ingredient", ingredientId]]),
				}
			);
		}

		const tmpSelected = selectedIngredients;
		if (isAdded)
			tmpSelected.splice(tmpSelected.indexOf(ingredientId), 1);
		else
			tmpSelected.push(ingredientId);
		setSelectedIngredients(tmpSelected);
		forceUpdate()
		setIsLoading(false);
	}


	const filteredIngredients = searchTerm.length > 0 || selectedCategory
		? searchableIngredients.filter(value => value.name.toLowerCase().includes(searchTerm.toLowerCase()))
		: [];
	return (
		<div className="manageIngredients">
			<h1 className="main-heading">Choose ingredients you'd like to turn into a delicious meal.</h1>
			<div className="tiles">
				{
					categories.map(({_id: category}) => (
						<button className="tile" onClick={toggleSelectCategory} data-category={category} key={category}>
							{/*<img src={ category.imgUrl } className="image" alt={ category.title }/>*/}
							<div className="overlay">
								<div className="text">{category || "Sonstiges"}</div>
							</div>
						</button>
					))
				}
			</div>
			<div className="search">
				<div className={"searchResults" + (filteredIngredients.length === 0 ? " empty" : "")}>
					{
						filteredIngredients.map(ingredient => (
							<button
								className={"ingredientResult" + (selectedIngredients.includes(ingredient.id) ? " added" : "")}
								onClick={toggleSelectedIngredient}
								data-ingredient-id={ingredient.id.toString()}
								data-added={selectedIngredients.includes(ingredient.id).toString()}
								key={ingredient.id.toString()}
							>
								{ ingredient.name }
							</button>
						))
					}
				</div>
				<input type="text" name="search" placeholder="Quick Search..." onChange={handleSearchChange}
					   autoComplete="off"/>
			</div>
		</div>
	);
}
