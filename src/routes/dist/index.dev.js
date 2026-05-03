"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authAuth = _interopRequireDefault(require("./authAuth.js"));

var _taskRoutes = _interopRequireDefault(require("./taskRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // health check


router.get("/", function (req, res) {
  res.status(200).json({
    success: true,
    message: "API is working 🚀"
  });
}); // 🔐 auth routes

router.use("/auth", _authAuth["default"]);
router.use("/tasks", _taskRoutes["default"]); // 📦 future routes
// router.use("/tasks", taskRoutes)

var _default = router;
exports["default"] = _default;