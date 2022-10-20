const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

const CLIENT_URL = "http://localhost:5173/";

//register route
router.post("/v1/signup", async (req, res) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		res.status(200).json(newUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//login route
router.get("/v1/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		console.log(user);
		if (user) {
			if (req.body.password === user.password) {
				res.status(200).json(user);
			} else {
				res.status(401).json("Wrong Credintials.");
			}
		} else {
			res.status(404).json("User not found.");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//oauth routes
router.get("/login/failure", (req, res) => {
	res.status(401).json({
		success: false,
		message: "Authentication failed.",
	});
});
router.get("/login/success", (req, res) => {
	if (req.user) {
		if (req.user.provider == "google") {
			const userData = req.user._json;
			const user = {
				firstName: userData.given_name,
				lastName: userData.family_name,
				email: userData.email,
				profilePic: userData.picture,
			};
			res.status(200).json(user);
		} else if (req.user.provider == "facebook") {
			const userData = req.user._json;
			const user = {
				firstName: userData.first_name,
				lastName: userData.last_name,
				email: userData.email,
				profilePic: userData.picture.data.url,
			};
			res.status(200).json(user);
		}
	} else {
		res.status(200).json(null);
	}
});
router.get("/logout", (req, res) => {
	req.logOut();
	res.redirect(CLIENT_URL);
});

//GoogleStrategy
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failure",
	})
);

//facebook strategy
router.get(
	"/facebook",
	passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failure",
	})
);

module.exports = router;
