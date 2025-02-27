import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

app.listen(PORT, () => {
  console.log("sever is running on PORT:" + PORT);
  connectDB();
});
