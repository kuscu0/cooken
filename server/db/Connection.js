class Connection {
    constructor(uri)  {
        this.MongoClient = require("mongodb").MongoClient;
        this.uri = uri;
        this.client = new this.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
}

module.exports = Connection;