const express = require("express");

const router = express.Router();

const { authController } = require("../controllers");

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

router.post("/signout", authController.signout);

router.get("/signin", (req, res) => res.render("landingPage", {}));

router.get("/signup", (req, res) => res.render("signupPage",{})); 

router.get("/message", (req, res) => res.render("messaging",{})); 


module.exports = router;
