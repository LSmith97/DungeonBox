///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { User } = require("../models");

///////////////////////////////
// CONTROLLERS
////////////////////////////////

module.exports = {
  show,
};

async function show(req, res) {
  try {
    res.json(await User.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
}
