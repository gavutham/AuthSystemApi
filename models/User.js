const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
