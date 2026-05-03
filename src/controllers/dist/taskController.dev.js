"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTasks = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;

var _express = _interopRequireDefault(require("express"));

var _taskService = require("../services/taskService.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createTask = function createTask(req, res, next) {
  var _req$body, title, status, data;

  return regeneratorRuntime.async(function createTask$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, title = _req$body.title, status = _req$body.status; // ✅ FIX

          if (title) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Title is required"
          }));

        case 4:
          if (!(!req.user || !req.user.id)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            success: false,
            message: "Unauthorized user"
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _taskService.createTaskService)({
            title: title,
            status: status || 'pending',
            // ✅ default fallback
            userId: req.user.id
          }));

        case 8:
          data = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: data
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
/**
 * GET TASKS (USER / ADMIN)
 */


exports.createTask = createTask;

var getTasks = function getTasks(req, res, next) {
  var data;
  return regeneratorRuntime.async(function getTasks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _taskService.getTasksService)({
            user: req.user
          }));

        case 3:
          data = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            count: data.length,
            data: data
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * UPDATE TASK
 */


exports.getTasks = getTasks;

var updateTask = function updateTask(req, res, next) {
  var _req$body2, title, status, id, data;

  return regeneratorRuntime.async(function updateTask$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, title = _req$body2.title, status = _req$body2.status; // ✅ FIX

          id = req.params.id;

          if (title) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Title is required"
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap((0, _taskService.updateTaskService)({
            title: title,
            status: status,
            taskId: id,
            userId: req.user.id
          }));

        case 7:
          data = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: data
          }));

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: _context3.t0.message
          }));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
/**
 * DELETE TASK
 */


exports.updateTask = updateTask;

var deleteTask = function deleteTask(req, res, next) {
  var id, data;
  return regeneratorRuntime.async(function deleteTask$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap((0, _taskService.deleteTaskService)({
            taskId: id,
            userId: req.user.id
          }));

        case 4:
          data = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: data
          }));

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.deleteTask = deleteTask;

var getAllTasks = function getAllTasks(req, res, next) {
  var data;
  return regeneratorRuntime.async(function getAllTasks$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap((0, _taskService.getAllTasksService)());

        case 3:
          data = _context5.sent;
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            message: "All tasks fetched successfully",
            count: data.length,
            data: data
          }));

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllTasks = getAllTasks;