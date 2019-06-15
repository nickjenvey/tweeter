"use strict";

const {ObjectId} = require("mongodb");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().sort( { created_at: 1 } ).toArray(callback);
    },

    // Increment the like value when someone clicks the like button
    updateLikes: function(id, callback) {
      console.log(id);
      db.collection("tweets").update( { _id: ObjectId(id) }, { $inc: { likes: 1 } } );
      db.collection("tweets").find( { _id: ObjectId(id) } ).toArray(callback);
    }

  };
}