import "./MyProfile.scss";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useEffect, useState} from "react";
import {authFetch, isLoggedIn} from "../../utils/utils";

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
