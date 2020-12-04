const MongoClient = require("mongodb").MongoClient;
const connectionErr = require("./connectionErr");
const bcrypt = require("bcrypt");

class Connection {
	saltRounds = 10

	constructor(uri) {
		this.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	}

	async hashPassword(password) {
		return await bcrypt.hash(password, this.saltRounds);
	}

	async checkPasswordValidity(password, hashedPassword) {
		return await bcrypt.compare(password, hashedPassword);
	}

	async createUser(usrName, usrPW, usrMail) {
		if (usrName === "")
			throw "User Name must not be empty";
		if (usrMail === "")
			throw "User E-Mail must not be empty";
		const hashedPw = await this.hashPassword(usrPW);
		const db = (await this.client.connect()).db("cooken");
		const existingUsers = await db.collection("users").find({email: usrMail});
		if (await existingUsers.count())
			throw "E-Mail unavailable";
		await db.collection("users").insertOne({
			name: usrName,
			email: usrMail,
			password: hashedPw,
		});
		return "success";
	}

	async updateUser(usrName, usrPW, usrMail) {
		const hashedPw = await this.hashPassword(usrPW);
		const db = (await this.client.connect()).db("cooken");
		await db.collection("users").updateOne(
			{
				email: usrMail
			},
			{
				name: usrName,
				email: usrMail,
				password: hashedPw,
			}
		);
		return "success";
	}

	async removeUser(usrMail) {
		const db = (await this.client.connect()).db("cooken");
		await db.collection("users").deleteOne(
			{
				email: usrMail
			}
		)
		return "success";
	}

	async checkUser(usrMail, usrPW) {
		const db = (await this.client.connect()).db("cooken");
		const result = await db.collection("users").findOne(
			{
				email: usrMail
			}
		);
		return await this.checkPasswordValidity(usrPW, result.password) ? result : null;
	}

	async getIngredientGroups() {
		const db = (await this.client.connect()).db("cooken");
		return new Promise((resolve, reject) => {
			db.collection("ingredients").aggregate(
				[
					{
						'$group': {
							'_id': '$category',
							'ingredients': {
								'$push': '$name'
							},
							'count': {
								'$sum': 1
							}
						}
					},
					{
						'$sort': {
							'count': -1
						}
					},
					{
						'$unset': "count"
					}
				],
				async (err, result) => {
					resolve(await result.toArray())
				}
			);
		});
	}
}

module.exports = Connection;