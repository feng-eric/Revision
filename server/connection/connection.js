'use strict'

const mongoose = require('mongoose');

module.exports = {

  // connect function to create a mongoDB connection
  'connectDB': function() {
    mongoose.connect(
      process.env.MONGO_DB,
      { useNewUrlParser: true, useUnifiedTopology: true }),
      function(err) {
        if (err) {
          console.log('Mongo DB connection failed');
          console.log(err);
        } else {
          console.log('Mongo DB connection successful.');
        }
      };
  },
}

mongoose.connection.on('open', function() {
  console.log('Connected to MongoDB');
})

mongoose.connection.on('error', function() {
  console.error.bind(console, 'MongoDB connection error:')
})