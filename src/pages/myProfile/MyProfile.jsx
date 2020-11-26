import "./MyProfile.scss";
import RecipeTile from "../../basics/recipeTile/RecipeTile";

export default function MyProfile() {
	function randStr() {
		const az = "qwertzuiopasdfghjklyxcvbnm   ";
		let out = "" ;
		for (let i = 0; i < 10; i++)
			out += az[Math.floor(Math.random() * az.length)];
		return out;
	}

	let randomRecipes = Array(20).fill(undefined).map(() => ({
		title: randStr(),
		img: "/img/carbonara.jpg",
		url: "/recipe"
	}));
	randomRecipes = randomRecipes.sort((recipeA, recipeB) =>
		recipeA.title.toLowerCase().replace(/\s/g, "").localeCompare(recipeB.title.toLowerCase().replace(/\s/g, ""))
	);

	return (
		<div className="myProfile paddedPage">
			<h1>My Recipes</h1>
			{
				randomRecipes.map((recipe, i) => (
					<RecipeTile
						recipeUrl={recipe.url}
						recipeTitle={recipe.title}
						recipeImg={recipe.img}
						key={i}
					/>
				))
			}
		</div>
	);
}
