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

    createUser(usrName, usrPW, usrMail) {
        let newPW = this.CryptoJS.SHA256(usrPW).toString();
        let client = this.client;
        return new Promise(function (resolve, reject) {
            function createUser(MongoClient, usrName, usrPW, usrEmail) {
                return new Promise(function (resolve, reject) {
                    MongoClient.connect(err => {
                        if (err) {
                            reject(err);
                        }
                        const collection = MongoClient.db("cooken").collection("users");
                        // perform actions on the collection object
                        collection.insertOne({name: usrName, password: usrPW, email: usrEmail}, err => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`success`);
                            }
                        });
                    });
                });
            }

            createUser(client, usrName, newPW, usrMail)
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    updateUser(usrName, usrPW, usrMail) {
        let newPW = this.CryptoJS.SHA256(usrPW).toString();
        let client = this.client;
        return new Promise(function (resolve, reject) {
            function updateUser(MongoClient, usrName, usrPW, usrEmail) {
                return new Promise(function (resolve, reject) {
                    MongoClient.connect(err => {
                        if (err) {
                            reject(err);
                        }
                        const collection = MongoClient.db("cooken").collection("users");
                        collection.update({name: usrName}, {name: usrName, password: usrPW, email: usrEmail}, err => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`success`);
                            }
                        });
                    });
                });
            }

            updateUser(client, usrName, newPW, usrMail)
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    removeUser(usrName) {
        let client = this.client;
        return new Promise(function (resolve, reject) {
            function removeUser(MongoClient, usrName) {
                return new Promise(function (resolve, reject) {
                    MongoClient.connect(err => {
                        if (err) {
                            reject(err);
                        }
                        const collection = MongoClient.db("cooken").collection("users");
                        collection.remove({name: usrName}, err => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`success`);
                            }
                        });
                    });
                });
            }

            removeUser(client, usrName)
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    checkUser(usrName, usrPW) {
        let client = this.client;
        let newPW = this.CryptoJS.SHA256(usrPW).toString();
        let _this = this;
        return new Promise(function (resolve, reject) {
            function checkUser(MongoClient, usrName, usrPW) {
                return new Promise(function (resolve, reject) {
                    MongoClient.connect(err => {
                        if (err) {
                            reject(err);
                        }
                        const collection = MongoClient.db("cooken").collection("users");
                        collection.findOne({name: usrName}, function (err, result) {
                            if (err) reject(err);
                            else {
                                if (usrPW == result.password) {
                                    resolve("success");
                                } else {
                                    reject(new _this.connectionErr("Wrong Credentials"));
                                }
                            }
                        });
                    })
                })
            }
            checkUser(client, usrName, newPW)
                .then(value => {
                    resolve(value)
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

module.exports = Connection;