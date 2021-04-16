const MongoClient = require("mongodb").MongoClient;
const LoginHandler = require("./connections/loginHandler");
const RecipeHandler = require("./connections/recipeHandler");
const UserHandler = require("./connections/userHandler");
const SearchHandler = require("./connections/searchHandler");

class Connection {

	constructor(uri) {
		this.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
		this.login = new LoginHandler(this.client);
		this.recipe = new RecipeHandler(this.client);
		this.user = new UserHandler(this.client);
		this.search = new SearchHandler(this.client);
	}
}

module.exports = Connection;