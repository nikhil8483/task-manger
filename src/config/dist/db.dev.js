"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _promise = _interopRequireDefault(require("mysql2/promise"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var db = _promise["default"].createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection(function (err, connection) {
  if (err) {
    console.log(" DB Connection Error:", err.message);
  } else {
    console.log(" MySQL Pool Connected");
    connection.release();
  }
});
var _default = db;
exports["default"] = _default;