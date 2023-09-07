///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Character, User } = require("../models");

module.exports = {
  index,
  show,
  create,
  destroy,
  update,
};

async function index(req, res, next) {
  try {
    res.json(await Character.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
}

async function show(req, res) {
  try {
    res.json(await Character.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
}

async function create(req, res) {
  try {
    const charData = { ...req.body };
    let user = await User.findOne({ email: charData.owner.email });
    if (!user) {
      const user = await User.create(charData.owner);
    }
    charData.owner = user._id;

    res.json(await Character.create(charData));
  } catch (error) {
    res.status(400).json(error);
  }
}

async function destroy(req, res) {
  try {
    res.json(await Character.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
}

async function update(req, res) {
  try {
    res.json(
      await Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
}
