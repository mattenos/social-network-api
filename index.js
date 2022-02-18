const express = require('express');
const mongodb = require('mongodb').MongoClient;
// const db = require('./config/connection');

const app = express();
const port = 3001;

// Change `shelterDB` based on the database you want to connect to.
const connectionStringURI = `mongodb://localhost:27017/socialDB`;

// Variable to hold the connection
let db;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());
