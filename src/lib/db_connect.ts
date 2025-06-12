import mongoose from "mongoose";

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

export default async function dbConnect(): Promise<void> {
  if (connection?.isConnected) return console.log("already connected to db");

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB connection failed: ", error);
    process.exit(1);
  }
}
