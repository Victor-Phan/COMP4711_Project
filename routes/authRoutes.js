const express = require("express");

const router = express.Router();

const { authController } = require("../controllers");

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

router.post("/signout", authController.signout);

router.get("/signin", (req, res) => res.render("landingPage", {}));

//router.get("/signin", (req, res) => res.render("unauthLandingPage", {})); // This is just a dummy for testing

router.get("/signup", (req, res) => res.render("signupDetails",{})); // This is just a dummy for testing

//router.get("/signup", (req, res) => res.send("Sign up form")); // This is just a dummy for testing

module.exports = router;
