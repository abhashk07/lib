// backend/server.js
const express = require('express');
const mongodb = require('mongodb');

const app = express();
const port = 5000;

// MongoDB connection URI
const mongoURI = 'mongodb://https://cloud.mongodb.com/v2/646c95e7c45da50c85fc0d6a#/metrics/replicaSet/646c98181111aa16657bedc6/explorer/test/users/find';

// Connect to MongoDB
mongodb.MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    const db = client.db('mydatabase');
    const collection = db.collection('users');

    // API endpoint to fetch all users
    app.get('/api/users', (req, res) => {
      collection.find().toArray((err, users) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(users);
        }
      });
    });

    // API endpoint to fetch a specific user
    // app.get('/api/users/:id', (req, res) => {
    //   const userId = req.params.id;
    //   collection.findOne({ _id: new mongodb.ObjectID(userId) }, (err, user) => {
    //     if (err) {
    //       console.error(err);
    //       res.status(500).json({ error: 'Internal server error' });
    //     } else if (!user) {
    //       res.status(404).json({ error: 'User not found' });
    //     } else {
    //       res.json(user);
    //     }
    //   });
    // });

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

