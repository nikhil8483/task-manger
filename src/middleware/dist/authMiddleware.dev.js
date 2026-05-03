"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }

  var token = authHeader.split(" ")[1];

  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // ✅ extra safety check


    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

var _default = verifyToken;
exports["default"] = _default;