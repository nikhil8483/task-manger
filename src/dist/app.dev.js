"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

require("./config/db.js");

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // middlewares

app.use((0, _cors["default"])());
app.use(_express["default"].json()); //  MAIN ROUTES

app.use("/api/v1", _index["default"]); // 404 handler (LAST me)

app.use(function (req, res) {
  res.status(404).json({
    message: "Route not found"
  });
}); // global error handler

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
});
var PORT = process.env.PORT || 5000;
console.log("JWT_SECRET:", process.env.JWT_SECRET);
app.listen(PORT, function () {
  console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
});