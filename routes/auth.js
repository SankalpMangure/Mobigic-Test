const express = require("express");
const authController = require("../controllers/auth");
const loginController = require("../controllers/login");
const router = express.Router();

router.post("/register", authController.register)
router.post("/login", loginController.login) 

module.exports = router;