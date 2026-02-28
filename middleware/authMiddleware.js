import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the admin exists
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found, authorization denied" });
    }

    // Attach admin info to request
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};