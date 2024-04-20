import jwt from "jsonwebtoken"
import User from "../model/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorised - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised - invalid token provided" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    req.user = user;
    next();
    

  } catch (error) {
    console.log("Error in Protect Route middleware", error.message);
    res.status(500).json({ error: "Interval Server Error" });
  }
}

export default protectRoute;