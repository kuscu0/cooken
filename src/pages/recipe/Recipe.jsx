import "./Recipe.scss";

export default function Recipe() {
	return (
		<div className="recipePage paddedPage">
			<h1>Spaghetti Carbonara</h1>
			<img src="/img/carbonara.jpg" alt="carbonara" className="recipeImage"/>
			<div className="ingredients">
				{
					[{
						groupName: "Title",
						ingredients: [
							{ amount: 400, unit: "g", name: "Spaghetti" },
							{ amount: 200, unit: "g", name: "Schinken", other: "roher" },
							{ amount: 4, unit: "", name: "Eigelb"},
							{ amount: 50, unit: "g", name: "Butter" },
							{ amount: 0, unit: "", name: "Salz und Pfeffer" },
							{ amount: 1, unit: "Prise(n)", name: "Muskat" },
							{ amount: 0, unit: "n. B.", name: "Parmesan", other: "frisch gerieben" },
						]
					}].map(ingredientsGroup => (
						<div className="ingredientGroup">
							{ ingredientsGroup.groupName && <h3>{ingredientsGroup.groupName}:</h3>}
							<table>
								{ingredientsGroup.ingredients.map(ingredient => (
									<tr>
										<td>
											<span className="amount">{ingredient.amount}</span>
											<span className="unit">{ingredient.unit}</span>
										</td>
										<td>
											<span className="ingredientName">{ ingredient.name }</span>
											{ ingredient.other && <span className="other">, { ingredient.other }</span> }
										</td>
									</tr>
								))}
							</table>
						</div>
					))
				}
			</div>
			<div className="description">
				<h2>Instructions</h2>

				<p>Die Pasta in reichlich Salzwasser bissfest kochen. Den Schinken in Würfel schneiden und in wenig
					Butter anbraten.</p>

				<p>Eigelb in einer großen Schüssel mit Salz, Pfeffer und Muskat verquirlen. Die Butter schaumig
					rühren und gut unter das Eigelb mischen. Die Schinkenwürfel und den geriebenen Käse gründlich
					unterrühren.</p>

				<p>Wenn die Nudeln gar sind, abgießen, sofort zu der Mischung in die Schüssel geben, nochmal alles
					gründlich durchmischen, dann sogleich servieren.</p>
			</div>
		</div>
	)
}