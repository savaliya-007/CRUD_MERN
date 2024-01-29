import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
try {
  mongoose.connect("mongodb://127.0.0.1:27017/myapp_ts");
} catch (error) {
  console.error(error);
}

// Use user routes
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
