var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require('cors');
const { MongoClient } = require('mongodb');

var connectionString = "mongodb://127.0.0.1:27017"
var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/details", (request, response)=>{
    mongoClient.connect(connectionString).then((clientObject)=>{
        var database = clientObject.db("list");
        database.collection("details").find({}).toArray().then((documents)=>{
            response.send(documents);
            
        })
    })
});

app.get("/profile/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("list");
        database.collection("details").find({id:id}).toArray().then(document=>{
            res.send(document);
            res.end();
        })
    })
});

app.put("/updateprofile",(req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("list");
         var findQuery = {id:parseInt(req.body.id)};
         var updateQuery = {$set : {Name:req.body.Name, Number:parseFloat(req.body.Number)}};

         database.collection("details").updateOne(findQuery, updateQuery).then(result=>{
            console.log("Record Updated");
            res.redirect("/details");
            res.end();
         })
    })
});

app.delete("/deleteprofile/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("list");
        database.collection("details").deleteOne({id:id}).then(result=>{
            console.log("Record Deleted");
            res.redirect("/details");
            res.end();
        })
    })
});

app.post('/addprofile',(req,res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("list")
        var profile = {
            "id": parseInt(req.body.id),
            "Name": req.body.Name,
            "Number": parseInt(req.body.Number)
        }
        database.collection('details').insertOne(profile).then(result=>{
            console.log("Record Inserted");
            res.end();
        })
    })
})
app.listen(8080);
console.log("Server Started : http://127.0.0.1:8080");