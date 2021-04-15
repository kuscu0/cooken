const bcrypt = require("bcrypt");

class LoginHandler {
    saltRounds = 10

    constructor(mongoClient) {
        this.client = mongoClient;
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
}

module.exports = LoginHandler;