const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../secets")

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});


// router.get("/savedRecipes", verifyJwt, asyncHandler(async (req, res, next) => {
// 	res.send("Wow my recipes!");
// }));

router.get("/inventory", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	res.send(await DB.user.getUserInventory(req.uid));
}));

router.put("/inventory", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.user.addToInventory(req.uid, req.body.ingredient));
	}
	catch (e) {
		res.status(400).send(e);
	}
}));

router.delete("/inventory", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.user.removeFromInventory(req.uid, req.body.ingredient));
	}
	catch (e) {
		res.status(400).send(e);
	}
}));

router.get("/savedRecipes", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		if (req.query.recipeId)
			res.send(await DB.user.isSavedRecipe(req.uid, req.query.recipeId));
		else
			res.json(await DB.user.getSavedRecipes(req.uid));
	}
	catch (e) {
		res.status(400).send(e.toString());
	}
}));

router.post("/savedRecipes", verifyJwt, asyncHandler(async (req, res, next) => {
	let DB = req.app.get('DB');
	try {
		res.send(await DB.user.toggleRecipe(req.uid, req.body.recipeId));
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
