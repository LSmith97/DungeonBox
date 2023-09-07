///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

///////////////////////////////
// ROUTES
////////////////////////////////

//show route
router.get("/:id", userCtrl.show);

module.exports = router;
