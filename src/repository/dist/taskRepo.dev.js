"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTasksRepo = exports.deleteTaskRepo = exports.updateTaskRepo = exports.getTasksByUserRepo = exports.createTaskRepo = void 0;

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// CREATE
var createTaskRepo = function createTaskRepo(_ref) {
  var title, status, userId, _ref2, _ref3, result, _ref4, _ref5, rows;

  return regeneratorRuntime.async(function createTaskRepo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          title = _ref.title, status = _ref.status, userId = _ref.userId;
          _context.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query("INSERT INTO tasks (title, status, userid) VALUES (?, ?, ?)", [title, status, userId]));

        case 3:
          _ref2 = _context.sent;
          _ref3 = _slicedToArray(_ref2, 1);
          result = _ref3[0];
          _context.next = 8;
          return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM tasks WHERE tid=?", [result.insertId]));

        case 8:
          _ref4 = _context.sent;
          _ref5 = _slicedToArray(_ref4, 1);
          rows = _ref5[0];
          return _context.abrupt("return", rows[0]);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}; // GET USER TASKS


exports.createTaskRepo = createTaskRepo;

var getTasksByUserRepo = function getTasksByUserRepo(_ref6) {
  var userId, _ref7, _ref8, rows;

  return regeneratorRuntime.async(function getTasksByUserRepo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = _ref6.userId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query("SELECT tid, title, status, created_at FROM tasks WHERE userid = ? ORDER BY created_at DESC", [userId]));

        case 3:
          _ref7 = _context2.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          rows = _ref8[0];
          return _context2.abrupt("return", rows);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getTasksByUserRepo = getTasksByUserRepo;

var updateTaskRepo = function updateTaskRepo(_ref9) {
  var title, status, taskId, userId, _ref10, _ref11, result, _ref12, _ref13, rows;

  return regeneratorRuntime.async(function updateTaskRepo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          title = _ref9.title, status = _ref9.status, taskId = _ref9.taskId, userId = _ref9.userId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query("UPDATE tasks SET title=?, status=? WHERE tid=? AND userid=?", [title, status, taskId, userId] // ✅ correct order
          ));

        case 3:
          _ref10 = _context3.sent;
          _ref11 = _slicedToArray(_ref10, 1);
          result = _ref11[0];

          if (!(result.affectedRows === 0)) {
            _context3.next = 8;
            break;
          }

          throw new Error("Task not found or unauthorized");

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM tasks WHERE tid=?", [taskId]));

        case 10:
          _ref12 = _context3.sent;
          _ref13 = _slicedToArray(_ref12, 1);
          rows = _ref13[0];
          return _context3.abrupt("return", rows[0]);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateTaskRepo = updateTaskRepo;

var deleteTaskRepo = function deleteTaskRepo(_ref14) {
  var taskId, userId, _ref15, _ref16, result;

  return regeneratorRuntime.async(function deleteTaskRepo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          taskId = _ref14.taskId, userId = _ref14.userId;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_db["default"].query("DELETE FROM tasks WHERE tid=? AND userid=?", [taskId, userId]));

        case 3:
          _ref15 = _context4.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          result = _ref16[0];

          if (!(result.affectedRows === 0)) {
            _context4.next = 8;
            break;
          }

          throw new Error("Task not found or unauthorized");

        case 8:
          return _context4.abrupt("return", {
            message: "Task deleted"
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteTaskRepo = deleteTaskRepo;

var getAllTasksRepo = function getAllTasksRepo() {
  var _ref17, _ref18, rows;

  return regeneratorRuntime.async(function getAllTasksRepo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_db["default"].query("SELECT tid, title, status, userid, created_at FROM tasks ORDER BY created_at DESC"));

        case 2:
          _ref17 = _context5.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          rows = _ref18[0];
          return _context5.abrupt("return", rows);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getAllTasksRepo = getAllTasksRepo;