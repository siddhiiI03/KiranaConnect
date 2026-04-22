import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

// routes
app.use("/api/orders", orderRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.json({});
});
app.get("/favicon.ico", (req, res) => res.status(204).end());