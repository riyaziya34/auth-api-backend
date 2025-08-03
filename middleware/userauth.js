const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.body.userId = decoded.id;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

exports.userAuth = userAuth;
