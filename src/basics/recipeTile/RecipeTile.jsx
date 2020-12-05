import "./RecipeTile.scss"
import React from "react"

export default function RecipeTile(props) {
	return (
		<a className="recipeTile" href={props["recipeUrl"]}>
			<div>
				<div className="tile" title={props["recipeTitle"]}>{props["recipeTitle"]}</div>
				<div className="misc">{props["other"]}</div>
			</div>
			<img src={props["recipeImg"]} alt={ props["recipeTitle"] } />
		</a>
	)
}