import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("🧪 Token from cookies:", token);
  console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token from auth" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Not authorized, token decode failed" });
    }

    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.log("❌ JWT verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token error",
      error: error.message,
    });
  }
};

export default authUser;
