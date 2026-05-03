"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = void 0;

var _authService = require("../services/authService.js");

var signup = function signup(req, res) {
  var _req$body, name, email, password, user;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // basic validation

          if (!(!name || !email || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Name, email and password are required"
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _authService.signupService)({
            name: name,
            email: email,
            password: password
          }));

        case 6:
          user = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          // 🔥 DEBUG (IMPORTANT)
          console.error("Signup Error:", _context.t0); // duplicate user (service error)

          if (!(_context.t0.message === "User already exists")) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            success: false,
            message: _context.t0.message
          }));

        case 15:
          if (!(_context.t0.code === "ER_DUP_ENTRY")) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            success: false,
            message: "Email already exists"
          }));

        case 17:
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: _context.t0.message || "Internal Server Error"
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.signup = signup;

var login = function login(req, res) {
  var _req$body2, email, password, _ref, token, user;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Email and password are required"
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _authService.loginService)({
            email: email,
            password: password
          }));

        case 6:
          _ref = _context2.sent;
          token = _ref.token;
          user = _ref.user;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
              token: token,
              role: user.role,
              userId: user.id,
              name: user.name,
              // ← BAS YEH ADD KARO
              email: user.email
            }
          }));

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error("Login Error:", _context2.t0);

          if (!(_context2.t0.message === "User not found" || _context2.t0.message === "Invalid credentials")) {
            _context2.next = 17;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid email or password"
          }));

        case 17:
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error"
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.login = login;