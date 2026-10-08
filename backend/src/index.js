import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// CORS
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(
    process.cwd(),
    "frontend",
    "dist"
  );

  console.log("Frontend path:", frontendPath);

  app.use(express.static(frontendPath));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(
      path.join(frontendPath, "index.html")
    );
  });
}

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
