const MongoClient = require("mongodb").MongoClient;
const connectionErr = require("./connectionErr");
const bcrypt = require("bcrypt");

class Connection {
    saltRounds = 10

    constructor(uri) {
        this.client = new this.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
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
        const hashedPw = this.hashPassword(usrPW);
        const db = (await this.client.connect()).db("cooken");
        const existingUsers = await db.collection("users").find({ email: usrMail });
        if (await existingUsers.count())
            throw "E-Mail unavailable";
        await db.collection("users").insertOne({
            name: usrName,
            password: hashedPw,
            email: usrMail
        });
        return "success";
    }

    async updateUser(usrName, usrPW, usrMail) {
        const hashedPw = this.hashPassword(usrPW);
        const db = (await this.client.connect()).db("cooken");
        await db.collection("users").update(
            {
                email: usrMail
            },
            {
                name: usrName,
                password: hashedPw,
                email: usrMail
            }
        );
        return "success";
    }

    async removeUser(usrMail) {
        const db = (await this.client.connect()).db("cooken");
        await db.collection("users").remove(
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
        if (await this.checkPasswordValidity(usrPW, result.password))
            return "success";
        else
            throw new connectionErr("Wrong Credentials");
    }
}

module.exports = Connection;