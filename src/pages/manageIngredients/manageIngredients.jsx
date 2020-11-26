import "./manageIngrediens.scss";

export default function ManageIngredients() {
	const categories = [];
	for (let i = 0; i < 20; i++) {
		categories.push({ title: "Fruits", imgUrl: "/img/logo.png" });
	}

	return (
		<div className="manageIngredients">
			<h1 className="main-heading">Choose ingredients you'd like to turn into a delicious meal.</h1>
			<div className="tiles">
				{
					categories.map(category => (
						<div className="tile">
							<img src={ category.imgUrl } className="image" alt={ category.title }/>
							<div className="overlay">
								<div className="text">{ category.title }</div>
							</div>
						</div>
					))
				}
			</div>
			<div className="search">
				<input type="text" name="search" placeholder="Quick Search..."/>
			</div>
		</div>
	);
}
