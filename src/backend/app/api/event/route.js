import mongoose from 'mongoose';
import dbConnect from "@/utils/dbConnect";
import { BallModel } from "@/models/ballSchema";
import { NextResponse } from 'next/server';

export async function GET(req) {
	// const { id } = req.query;
const id ="XXX"
	try {
		await dbConnect();
		console.log("successfully connected to Mongo");
		const ball = await BallModel.find();
		console.log(ball);
		return NextResponse.json({ data: ball });
	} catch (error) {
		return NextResponse.json({ message: `Error fetching data for fixture ${id}:`, error });
	} finally {
    mongoose.disconnect();
  }
}
