class Connection {
    constructor(uri) {
        this.MongoClient = require("mongodb").MongoClient;
        this.uri = uri;
        this.client = new this.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.CryptoJS = require("crypto-js");
        this.connectionErr = require("./connectionErr");
    }

    testDB() {
        this.client.connect(err => {
            if (err) {
                console.log(err);
            }
            const collection = this.client.db("cooken").collection("recipes");
            // perform actions on the collection object
            collection.insertOne({name: "Spätzle", persons: "20002"}, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Inserted");
                }
            })
        });
    }

    async createUser(usrName, usrPW, usrMail) {
        const hashedPw = this.CryptoJS.SHA256(usrPW).toString(), client = this.client;
        const db = (await client.connect()).db("cooken");
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
        const hashedPw = this.CryptoJS.SHA256(usrPW).toString();
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
        const hashedPw = this.CryptoJS.SHA256(usrPW).toString();
        const db = (await this.client.connect()).db("cooken");
        const result = await db.collection("users").findOne(
            {
                email: usrMail
            }
        );
        if (result.password === hashedPw)
            return "success";
        else
            throw new this.connectionErr("Wrong Credentials");
    }
}

module.exports = Connection;