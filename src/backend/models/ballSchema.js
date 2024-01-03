import mongoose from "mongoose";

const ballSchema = new mongoose.Schema({
	_id: String,
	ball: Number,
});

export const BallModel =
	mongoose.models.Ball ||
	mongoose.model("Ball", ballSchema);