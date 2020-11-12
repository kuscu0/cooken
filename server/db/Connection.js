class Connection {
    constructor(uri)  {
        this.MongoClient = require("mongodb").MongoClient;
        this.uri = uri;
        this.client = new this.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.CryptoJS = require("crypto-js");
    }

    testDB(){
        this.client.connect(err => {
            if(err) {
                console.log(err);
            }
            const collection = this.client.db("cooken").collection("recipes");
            // perform actions on the collection object
            collection.insertOne({ name: "Spätzle", persons: "20000" }, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Inserted");
                }
            })
        });
    }

    createUser(usrName, usrPW, usrMail){
        function createUser(MongoClient, usrName, usrPW, usrEmail) {
            return new Promise(function (resolve, reject) {
                MongoClient.connect(err => {
                    if (err) {
                        console.log(err);
                    }
                    const collection = MongoClient.db("cooken").collection("users");
                    // perform actions on the collection object
                    collection.insertOne({name: usrName, password: usrPW, email: usrEmail}, err => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log("Inserted");
                            resolve();
                        }
                    });
                });
            });
        }

        let newPW = this.CryptoJS.SHA256(usrPW).toString();
        console.log(newPW);

        createUser(this.client, usrName, newPW, usrMail)
            .then( value => { console.log("test") })
            .catch( err => { console.log(err) });
    }
}

module.exports = Connection;