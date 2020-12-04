import "./ManageIngrediens.scss";
import React, {useEffect} from "react";
import {serverAddress} from "../../globals";

export default function ManageIngredients() {
	const [categories, setCategories] = React.useState([]);
	const [selectedCategory, setSelectedCategory] = React.useState("");
	// const [filteredIngredients, setFilteredIngredients] = React.useState([]);
	const [allIngredients, setAllIngredients] = React.useState([]);
	const [searchableIngredients, setSearchableIngredients] = React.useState([]);
	const [searchTerm, setSearchTerm] = React.useState("");


	useEffect(() => {
		fetch(`${serverAddress}/users/ingredientGroups`).then(async response => {
			const ingredientGroups = await response.json();
			setCategories(ingredientGroups.ingredientGroups);
			const allIngredients = ingredientGroups.ingredientGroups.map(group => group.ingredients).flat();
			setAllIngredients(allIngredients);
			setSearchableIngredients(allIngredients)
		});
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


	const filteredIngredients = searchTerm.length > 0 || selectedCategory
		? searchableIngredients.filter(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
		: [];
	return (
		<div className="manageIngredients">
			<h1 className="main-heading">Choose ingredients you'd like to turn into a delicious meal.</h1>
			<div className="tiles">
				{
					categories.map(({_id: category}) => (
						<button className="tile" onClick={toggleSelectCategory} data-category={category}>
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
							<button className="ingredientResult">{ingredient}</button>
						))
					}
				</div>
				<input type="text" name="search" placeholder="Quick Search..." onChange={handleSearchChange}
					   autoComplete="off"/>
			</div>
		</div>
	);
}
