"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTasksService = exports.deleteTaskService = exports.updateTaskService = exports.getTasksService = exports.createTaskService = void 0;

var _taskRepo = require("../repository/taskRepo.js");

// CREATE
var createTaskService = function createTaskService(_ref) {
  var title, status, userId;
  return regeneratorRuntime.async(function createTaskService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          title = _ref.title, status = _ref.status, userId = _ref.userId;

          if (title) {
            _context.next = 3;
            break;
          }

          throw new Error("Title is required");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _taskRepo.createTaskRepo)({
            title: title,
            status: status,
            userId: userId
          }));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // GET


exports.createTaskService = createTaskService;

var getTasksService = function getTasksService(_ref2) {
  var user;
  return regeneratorRuntime.async(function getTasksService$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = _ref2.user;

          if (!(user.role === "admin")) {
            _context2.next = 5;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _taskRepo.getAllTasksRepo)());

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _taskRepo.getTasksByUserRepo)({
            userId: user.id
          }));

        case 7:
          return _context2.abrupt("return", _context2.sent);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // UPDATE


exports.getTasksService = getTasksService;

var updateTaskService = function updateTaskService(_ref3) {
  var title, status, taskId, userId;
  return regeneratorRuntime.async(function updateTaskService$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          title = _ref3.title, status = _ref3.status, taskId = _ref3.taskId, userId = _ref3.userId;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _taskRepo.updateTaskRepo)({
            title: title,
            status: status,
            taskId: taskId,
            userId: userId
          }));

        case 3:
          return _context3.abrupt("return", _context3.sent);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // DELETE


exports.updateTaskService = updateTaskService;

var deleteTaskService = function deleteTaskService(_ref4) {
  var taskId, userId;
  return regeneratorRuntime.async(function deleteTaskService$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          taskId = _ref4.taskId, userId = _ref4.userId;
          _context4.next = 3;
          return regeneratorRuntime.awrap((0, _taskRepo.deleteTaskRepo)({
            taskId: taskId,
            userId: userId
          }));

        case 3:
          return _context4.abrupt("return", _context4.sent);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteTaskService = deleteTaskService;

var getAllTasksService = function getAllTasksService() {
  var tasks;
  return regeneratorRuntime.async(function getAllTasksService$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _taskRepo.getAllTasksRepo)());

        case 2:
          tasks = _context5.sent;
          return _context5.abrupt("return", tasks);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getAllTasksService = getAllTasksService;