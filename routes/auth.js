const router = require("express").Router();
const User = require("../models/User");

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

module.exports = router;
