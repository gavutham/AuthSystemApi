const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");

const app = express();
dotenv.config();
app.use(express.json());

mongoose
	.connect(process.env.MONGO)
	.then(console.log("Succesfully Connected to database."))
	.catch((err) => console.error(err));

app.use(
	cookieSession({
		name: "session",
		keys: ["my secret key"],
		maxAge: 34 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: "https://auth-system-skill-test.herokuapp.com/",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use("/", authRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
	console.log("listening on port 5000");
});
