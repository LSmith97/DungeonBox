///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const mongoose = require("mongoose");
const Schema = mongoose.Schema

///////////////////////////////
// MODELS
////////////////////////////////

const CharacterSchema = new Schema({
  owner : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  class: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  race: {
    type: String,
    required: true,
  },
  str: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  },
  dex: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  },
  con: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  },
  int: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  },
  wis: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  },
  cha: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  }
},{timestamps: true});

module.exports = mongoose.model("Character", CharacterSchema);

