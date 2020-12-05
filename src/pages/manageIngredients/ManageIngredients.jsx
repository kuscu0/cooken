import "./ManageIngrediens.scss";
import React, {useEffect} from "react";
import {serverAddress} from "../../globals";

export default function ManageIngredients() {
	const [categories, setCategories] = React.useState([]);
	const [selectedCategory, setSelectedCategory] = React.useState("");
	const [allIngredients, setAllIngredients] = React.useState([]);
	const [searchableIngredients, setSearchableIngredients] = React.useState([]);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [selectedIngredients, setSelectedIngredients] = React.useState([]);


	useEffect(() => {
		fetch(`${serverAddress}/users/ingredientGroups`).then(async response => {
			const ingredientGroups = await response.json();
			setCategories(ingredientGroups.ingredientGroups);
			const allIngredients = ingredientGroups.ingredientGroups.map(group => group.ingredients).flat();
			setAllIngredients(allIngredients);
			setSearchableIngredients(allIngredients)
		});
		if (localStorage.token) {
			fetch(`${serverAddress}/users/inventory`, { headers: new Headers({Authorization: `Bearer ${localStorage.token}`}) }).then(async response => {
				setSelectedIngredients(await response.json());
			})
		}
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
		const isAdded = event.currentTarget.classList.contains("added");
		const ingredientId = event.currentTarget.getAttribute("data-ingredient-id");
		const response = await fetch(
			`${serverAddress}/users/inventory`,
			{
				method: isAdded ? "DELETE" : "PUT",
				headers: new Headers({Authorization: `Bearer ${localStorage.token}`}),
				body: new URLSearchParams([["ingredient", ingredientId]]),
			}
		);
		if (await response.text() === "success") {
			const tmpSelected = selectedIngredients;
			if (isAdded)
				tmpSelected.splice(tmpSelected.indexOf(ingredientId), 1);
			else
				tmpSelected.push(ingredientId);
			setSelectedIngredients(tmpSelected);
		}
		else {
			console.error("Error toggling ingredient");
			// TODO display error
		}
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
