import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "node:path";

// local imports
import { server, app } from "./lib/socket.js";
import connectDB from "./lib/connectDB.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is listen on port 3000");
  connectDB();
});
