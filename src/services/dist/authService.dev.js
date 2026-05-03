"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "findUserByEmail", {
  enumerable: true,
  get: function get() {
    return _authRepo.findUserByEmail;
  }
});
exports.loginService = exports.signupService = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _authRepo = require("../repository/authRepo.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signupService = function signupService(data) {
  var name, email, password, existing, hashedPassword;
  return regeneratorRuntime.async(function signupService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = data.name, email = data.email, password = data.password; // check user exists

          _context.next = 3;
          return regeneratorRuntime.awrap((0, _authRepo.findUserByEmail)(email));

        case 3:
          existing = _context.sent;

          if (!existing) {
            _context.next = 6;
            break;
          }

          throw new Error("User already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 8:
          hashedPassword = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _authRepo.createUser)({
            name: name,
            email: email,
            password: hashedPassword,
            role: "user"
          }));

        case 11:
          return _context.abrupt("return", _context.sent);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.signupService = signupService;

var loginService = function loginService(_ref) {
  var email, password, user, isMatch, token;
  return regeneratorRuntime.async(function loginService$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = _ref.email, password = _ref.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _authRepo.findUserByEmail)(email));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          throw new Error("User not found");

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 8:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 11;
            break;
          }

          throw new Error("Invalid credentials");

        case 11:
          //  JWT token generate
          token = _jsonwebtoken["default"].sign({
            id: user.id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: "1d"
          });
          return _context2.abrupt("return", {
            token: token,
            user: user
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.loginService = loginService;