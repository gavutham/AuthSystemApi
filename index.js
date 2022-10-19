const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

const app = express();
dotenv.config();
app.use(express.json());

app.use(
	cors({
		origin: "http://127.0.0.1:5173/",
	})
);

mongoose
	.connect(process.env.MONGO)
	.then(console.log("Succesfully Connected to database."))
	.catch((err) => console.error(err));

app.use("/", authRoute);

app.listen(5000, () => {
	console.log("listening on port 5000");
});
