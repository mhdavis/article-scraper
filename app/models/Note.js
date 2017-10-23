// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
const Schema = mongoose.Schema;

// Create the Note schema
const NoteSchema = new Schema({

  // Just a string
  text: {
    type: String,
    required: true
  }

});

// Export the Note Schema
module.exports = NoteSchema;
