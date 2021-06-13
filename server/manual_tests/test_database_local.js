
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if(err) {
        console.log(err);
    }
    const collection = client.db("cooken").collection("recipesNew");
    // perform actions on the collection object
    collection.insertOne({ name: "Spätzle", persons: "20000" }, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Inserted");
        }
    })
});