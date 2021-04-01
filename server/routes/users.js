const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../secets")

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.put('/', asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.createUser(req.body.name, req.body.password, req.body.email));
	} catch (e) {
		res.status(e.statusCode || 500).json(e);
		console.error(e);
	}
}));

router.patch('/', asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.updateUser(req.body.name, req.body.password, req.body.email));
	} catch (e) {
		res.status(e.statusCode || 500).json(e);
		console.error(e);
	}
}));

router.delete('/', asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.removeUser(req.body.email));

	} catch (e) {
		res.status(e.statusCode || 500).json(e);
		console.error(e);
	}
}));

router.post("/login", asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	const {email, password} = req.body;
	const foundUser = await DB.checkUser(email, password);
	if (foundUser) {
		res.json({
			token: jwt.sign(
				{uid: foundUser._id},
				jwtSecret,
				{
					expiresIn: 60 * 60 * 24 * 7      // valid for 6 days
				}
			)
		});
	} else {
		res.status(401).send("Wrong credentials");
	}
}));

// router.get("/savedRecipes", verifyJwt, asyncHandler(async (req, res, next) => {
// 	res.send("Wow my recipes!");
// }));

router.get("/ingredientGroups", asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	res.json({ ingredientGroups: await DB.getIngredientGroups() });
}));

router.get("/inventory", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	res.send(await DB.getUserInventory(req.uid));
}));

router.put("/inventory", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.addToInventory(req.uid, req.body.ingredient));
	}
	catch (e) {
		res.status(400).send(e);
	}
}));

router.delete("/inventory", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.removeFromInventory(req.uid, req.body.ingredient));
	}
	catch (e) {
		res.status(400).send(e);
	}
}));

router.get("/recipe/*", asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.json(await DB.getRecipeData(req.path.match(/[^/]*$/)[0]));
	}
	catch (e) {
		res.status(404).send(e);
	}
}));

router.get("/savedRecipes", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		if (req.query.recipeId)
			res.send(await DB.isSavedRecipe(req.uid, req.query.recipeId));
		else
			res.json(await DB.getSavedRecipes(req.uid));
	}
	catch (e) {
		res.status(400).send(e.toString());
	}
}));

router.post("/savedRecipes", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.toggleRecipe(req.uid, req.body.recipeId));
	}
	catch (e) {
		res.status(400).send(e.toString());
	}
}));

function verifyJwt(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).send("Missing authorization header");
	}
	const token = authHeader.match(/(?<=Bearer\s+)(.+)/i)[0];
	jwt.verify(token, jwtSecret, (err, data) => {
		if (err) {
			res.status(403).send("invalid token");
			return
		}
		req.uid = data.uid;
		next();
	});
}


module.exports = router;
