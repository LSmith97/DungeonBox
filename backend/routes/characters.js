///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const router = express.Router();
const charCtrl = require("../controllers/characters");

///////////////////////////////
// ROUTES
////////////////////////////////

//index route
router.get("/", charCtrl.index);

//show route
router.get("/:id", charCtrl.show);

//create route
router.post("/", charCtrl.create);

//delete route
router.delete("/:id", charCtrl.destroy);

//update route
router.put("/:id", charCtrl.update);

module.exports = router;
