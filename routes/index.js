const express = require("express");
const router = express.Router();
const controller = require("../controller");
module.exports = router;

router.post("/login", controller.login);
router.get("/logout", controller.logout);
