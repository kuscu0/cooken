import "./Recipe.scss";
import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import SimpleButton from "../../basics/simpleButton/SimpleButton";
import {authFetch, deepClone, isLoggedIn, serverAddress} from "../../utils/utils";
import RecipeImg from "../../basics/recipeImage/RecipeImage";
import {IsLoadingContext} from "../../context/IsLoadingContext";
import Comment from "./comment/Comment";

export default function Recipe() {
	const [recipeData, setRecipeData] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [comments, setComments] = useState({});
	const location = useLocation();
	const [, setIsLoading] = useContext(IsLoadingContext);
	const recipeId = location.pathname.match(/\d+/)[0];

	useEffect(() => {
		setIsLoading(true);
		fetch(`${serverAddress}/recipe/recipe/${recipeId}`).then(async response => {
			if (response.status !== 200)
				throw new Error("Error getting recipe");
			const data = await response.json()
			setRecipeData(data);

			const isSavedResponse = await authFetch(`/users/savedRecipes?recipeId=${encodeURIComponent(data._id)}`, false);
			setIsSaved(isSavedResponse === "true");
			setIsLoading(false);
		});

		if (isLoggedIn()) {
			authFetch(`/users/recipeComment?recipeId=${recipeId}`, true).then(loadedComments => {
				const newComments = {};
				for (const [key, value] of Object.entries(loadedComments))
					newComments[key] = { initialText: value };
				setComments(newComments);
			})
		}

	}, [location.pathname]);

	async function toggleSaveRecipe() {
		if (!recipeData)
			throw new Error("No loaded recipe");

		const response = await authFetch("/users/savedRecipes", false, {
			method: "POST",
			body: new URLSearchParams([["recipeId", recipeData._id]])
		})

		setIsSaved(response === "true");
	}

	function onDescriptionClick(e) {
		const index = parseInt(e.target.dataset.i);
		if (isNaN(index))
			return;
		if (index in comments)
			return;
		const newComments = deepClone(comments);
		newComments[index] = {
			initialText: ""
		};
		setComments(newComments);
	}

	function deleteAtIndex(index) {
		const newComments = deepClone(comments);
		delete newComments[index];
		setComments(newComments);
	}

	let i = 0;
	return (
		<div className="recipePage paddedPage">
			<div className="title">
				<h1>{recipeData?.title}</h1>
				{ isLoggedIn() && <SimpleButton onClick={toggleSaveRecipe}>{isSaved ? "Unsave" : "Save"}</SimpleButton>}
			</div>
			{ recipeData && <RecipeImg recipeData={recipeData} quality="l"/>}
			<div className="ingredients">
				{
					recipeData?.ingredientGroups.map((ingredientsGroup, i) => (
						<div className="ingredientGroup" key={i}>
							<h3>{ingredientsGroup.header}</h3>
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
			<div className="description" onClick={onDescriptionClick}>
				{ recipeData?.instructions.split("\n")
					.filter(paragraph => Boolean(paragraph))
					.map((paragraph) => <p key={i}>{
						paragraph.split("")
							.map((word) =>
								<span key={i} data-i={i++}>
									{ word }
									{ i in comments &&
										<Comment
											index={i}
											initialText={comments[i].initialText}
											recipeId={recipeId}
											onDelete={deleteAtIndex}
										/> }
								</span>)
					}</p>)
				}
			</div>
		</div>
	)
}