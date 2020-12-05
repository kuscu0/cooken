import "./RecipeTile.scss"
import React from "react"
import {Link} from "react-router-dom";

export default function RecipeTile(props) {
	return (
		<Link className="recipeTile" to={props["recipeUrl"]}>
			<div>
				<div className="tile" title={props["recipeTitle"]}>{props["recipeTitle"]}</div>
				<div className="misc">{props["other"]}</div>
			</div>
			<img src={props["recipeImg"]} alt={ props["recipeTitle"] } />
		</Link>
	)
}