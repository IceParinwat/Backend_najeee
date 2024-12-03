import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import connectDB from "./config/db.js";
// use env file
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// connect DB
connectDB();

// cors
const allowedOrigins = [
  "http://localhost:5173", // For local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// API Path endpoint
app.use("/book", bookingRoutes);
app.use("/team-members", teamMemberRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
