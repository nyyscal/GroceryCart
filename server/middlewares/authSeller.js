import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  console.log("🧪 Token from cookies:", sellerToken);
  console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not authorized, no token from auth" });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET); // ✅ only inside try
    console.log("✅ Token decoded:", decoded);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Not authorized, token decode failed" });
    }

    req.userId = decoded.id; // 👈 Attach the user ID
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
