import "./MyProfile.scss";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useEffect, useState} from "react";
import {authFetch, isLoggedIn, serverAddress} from "../../utils/utils";
import RecipeImg from "../../basics/recipeImage/RecipeImage";

export default function MyProfile() {
	const [savedRecipes, setSavedRecipes] = useState([]);

	function stringSort(recipeA, recipeB) {
		return recipeA.title.toLowerCase().replace(/\s/g, "")
			.localeCompare(
				recipeB.title.toLowerCase().replace(/\s/g, "")
			)
	}

	useEffect(() => {
		if (!isLoggedIn())
			return;
		authFetch("/users/savedRecipes", true)
			.then(response => setSavedRecipes(response.sort(stringSort)));
	}, []);

	function randStr() {
		const az = "qwertzuiopasdfghjklyxcvbnm   ";
		let out = "";
		for (let i = 0; i < 10; i++)
			out += az[Math.floor(Math.random() * az.length)];
		return out;
	}

	let randomRecipes = Array(20).fill(undefined).map(() => ({
		title: randStr(),
		img: "/img/carbonara.jpg",
		url: "/recipe"
	}));
	randomRecipes = randomRecipes.sort();

	return (
		<div className="myProfile paddedPage">
			<h1>My Recipes</h1>
			{
				savedRecipes.map((recipe, i) => (
					<RecipeTile
						recipeData={recipe}
						key={i}
					/>
				))
			}
		</div>
	);
}
