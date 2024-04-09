var express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express()
const uri = "mongodb+srv://s217590332:BZhdv5xBUN1lIP2W@sit725.gjex4b9.mongodb.net/?retryWrites=true&w=majority&appName=sit725";
var port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
    } 
});

async function runDBConnection() { 
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        collection = client.db("Text1").collection('Cat');
        console.log(collection);
    } catch (ex) { 
        console.error(ex);
    }
}
app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/api/cards', (req, res) => {
    getAllCards((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'get all cards success' });
        }
    })
});

app.post('/api/cards', (req, res) => {
    const formData = req.body;
    postCard(formData, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'post cat success' });
        }
    })
});

app.listen(3000, () => {
    console.log('express server started');
    runDBConnection();
});

getAllCards = (callback) => {
    collection.find({}).toArray((err, result) => {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    })
}

postCard = (formData, callback) => {
    collection.insertOne(formData, (err, result) => {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    })
}