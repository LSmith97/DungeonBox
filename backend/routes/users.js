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
router.get("/:id", charCtrl.show);

module.exports = router;
