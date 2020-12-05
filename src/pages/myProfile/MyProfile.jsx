import "./MyProfile.scss";
import RecipeTile from "../../basics/recipeTile/RecipeTile";
import {useEffect, useState} from "react";
import {serverAddress} from "../../globals";

export default function MyProfile() {
	const [savedRecipes, setSavedRecipes] = useState([]);

	function stringSort(recipeA, recipeB) {
		return recipeA.title.toLowerCase().replace(/\s/g, "")
			.localeCompare(
				recipeB.title.toLowerCase().replace(/\s/g, "")
			)
	}

	useEffect(() => {
		if (!localStorage.token)
			return;
		fetch(`${serverAddress}/users/savedRecipes`,
			{headers: new Headers({Authorization: `Bearer ${localStorage.token}`}),}
		).then(async response => {
			if (response.status !== 200)
				throw "error getting saved recipes";
			setSavedRecipes((await response.json()).sort(stringSort));
		});
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
						recipeUrl={`/recipe/${recipe._id}`}
						recipeTitle={recipe.title}
						recipeImg={`https://img.chefkoch-cdn.de/rezepte/${recipe?._id}/bilder/${recipe?.previewImageId}/crop-552x552/${recipe?.title.replace(/\s/g, "-")}.jpg`}
						other={recipe.instructions.slice(0, 20)}
						key={i}
					/>
				))
			}
		</div>
	);
}
