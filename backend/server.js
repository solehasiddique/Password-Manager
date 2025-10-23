const express = require('express')
const dotenv= require('dotenv')
const { MongoClient } =require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const app= express();
const port = 3000;
app.use(bodyparser.json())
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

client.connect();


app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection= db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})


app.post('/', async(req, res) => {
  const password= req.body
  const db = client.db(dbName);
  const collection= db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

app.delete('/', async(req, res) => {
  const password= req.body
  const db = client.db(dbName);
  const collection= db.collection('passwords');
   const findResult = await collection.deleteOne({ id: id });
  res.send({success: true, result: findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
