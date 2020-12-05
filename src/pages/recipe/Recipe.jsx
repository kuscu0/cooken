import "./Recipe.scss";
import React, {useEffect, useState} from "react";
import {serverAddress} from "../../globals";
import {useLocation} from "react-router-dom";
import SimpleButton from "../../basics/simpleButton/SimpleButton";

export default function Recipe() {
	const [recipeData, setRecipeData] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const location = useLocation();

	useEffect(() => {
		fetch(`${serverAddress}/users${location.pathname}`).then(async response => {
			if (response.status !== 200)
				throw "Error getting recipe";
			const data = await response.json()
			setRecipeData(data);

			const isSavedResponse = await fetch(
				`${serverAddress}/users/savedRecipes?recipeId=${encodeURIComponent(data._id)}`,
				{
					headers: new Headers({Authorization: `Bearer ${localStorage.token}`}),
				}
			);
			setIsSaved(await isSavedResponse.text() === "true");
		})

	}, [location.pathname]);

	async function toggleSaveRecipe() {
		if (!recipeData)
			throw "No loaded recipe"

		const response = await fetch(`${serverAddress}/users/savedRecipes`, {
			method: "POST",
			headers: new Headers({Authorization: `Bearer ${localStorage.token}`}),
			body: new URLSearchParams([["recipeId", recipeData._id]])
		})
		if (response.status !== 200)
			throw "Error toggling save";

		setIsSaved(await response.text() === "true");
	}

	return (
		<div className="recipePage paddedPage">
			<div className="title">
				<h1>{recipeData?.title}</h1>
				<SimpleButton onClick={toggleSaveRecipe}>{ isSaved ? "Unsave" : "Save"}</SimpleButton>
			</div>
			<img src={`https://img.chefkoch-cdn.de/rezepte/${recipeData?._id}/bilder/${recipeData?.previewImageId}/crop-552x552/${recipeData?.title.replace(/\s/g, "-")}.jpg`} alt={recipeData?.title} className="recipeImage"/>
			<div className="ingredients">
				{
					recipeData?.ingredientGroups.map((ingredientsGroup, i) => (
						<div className="ingredientGroup" key={i}>
							{!/\s*/.test(ingredientsGroup.header) && <h3>{ingredientsGroup.header}:</h3>}
							<table>
								<tbody>
								{ingredientsGroup.ingredients.map((ingredient, i) => (
									<tr key={i}>
										<td>
											{ingredient.amount !== 0 && <span className="amount">{ingredient.amount}</span>}
											<span className="unit">&nbsp;{ingredient.unit}</span>
										</td>
										<td>
											<span className="ingredientName">{ingredient.name}</span>
											{ingredient.usageInfo &&
											<span className="other">{ingredient.usageInfo}</span>}
										</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
					))
				}
			</div>
			<div
				className="description"
				/* TODO replace that with safer solution */
				dangerouslySetInnerHTML={{ __html: recipeData?.instructions.replace(/(.*\n)/g, "<p>$1</p>")}}
			>
				{/*<h2>Instructions</h2>*/}

				{/*<p>Die Pasta in reichlich Salzwasser bissfest kochen. Den Schinken in Würfel schneiden und in wenig*/}
				{/*	Butter anbraten.</p>*/}

				{/*<p>Eigelb in einer großen Schüssel mit Salz, Pfeffer und Muskat verquirlen. Die Butter schaumig*/}
				{/*	rühren und gut unter das Eigelb mischen. Die Schinkenwürfel und den geriebenen Käse gründlich*/}
				{/*	unterrühren.</p>*/}

				{/*<p>Wenn die Nudeln gar sind, abgießen, sofort zu der Mischung in die Schüssel geben, nochmal alles*/}
				{/*	gründlich durchmischen, dann sogleich servieren.</p>*/}
			</div>
		</div>
	)
}