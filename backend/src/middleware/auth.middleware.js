import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  //   let token;
  //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
  //     try {
  //       token = req.headers.authorization.split(" ")[1];
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //       req.user = await User.findById(decoded.userId).select("-password");
  //       next();
  //     } catch (error) {
  //       console.error("Error during token verification:", error.message);
  //       res.status(401).json({ message: "Not authorized, token failed" });
  //     }
  //   } else {
  //     res.status(401).json({ message: "Not authorized, no token" });
  //   }

  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error during token verification:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
