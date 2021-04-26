import "./RecipeTile.scss"
import React from "react"
import {Link} from "react-router-dom";
import RecipeImg from "../recipeImage/RecipeImage";

export default function RecipeTile({ recipeData }) {
	return (
		<Link className="recipeTile" to={`/recipe/${recipeData._id}`}>
			<div>
				<div className="tile" title={recipeData.title}>{recipeData.title}</div>
				<div className="misc">{recipeData.instructions}</div>
			</div>
			{ recipeData && <RecipeImg recipeData={recipeData} quality="s"/>}
		</Link>
	)
}
