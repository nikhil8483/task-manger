"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserByEmail = exports.createUser = void 0;

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createUser = function createUser(_ref) {
  var name, email, password, _ref$role, role, _ref2, _ref3, result;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = _ref.name, email = _ref.email, password = _ref.password, _ref$role = _ref.role, role = _ref$role === void 0 ? "user" : _ref$role;
          _context.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, password, role]));

        case 3:
          _ref2 = _context.sent;
          _ref3 = _slicedToArray(_ref2, 1);
          result = _ref3[0];
          return _context.abrupt("return", {
            uid: result.insertId,
            name: name,
            email: email,
            role: role
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createUser = createUser;

var findUserByEmail = function findUserByEmail(email) {
  var _ref4, _ref5, rows;

  return regeneratorRuntime.async(function findUserByEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_db["default"].query("SELECT uid AS id, name, email, password, role FROM users WHERE email = ? LIMIT 1", [email]));

        case 2:
          _ref4 = _context2.sent;
          _ref5 = _slicedToArray(_ref4, 1);
          rows = _ref5[0];
          return _context2.abrupt("return", rows[0] || null);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.findUserByEmail = findUserByEmail;