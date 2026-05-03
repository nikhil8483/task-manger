"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _taskController = require("../controllers/taskController.js");

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware.js"));

var _roleMiddleware = require("../middleware/roleMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var protect = [_authMiddleware["default"], (0, _roleMiddleware.authorizeRoles)("user", "admin")];
router.post.apply(router, ["/"].concat(protect, [_taskController.createTask]));
router.get.apply(router, ["/"].concat(protect, [_taskController.getTasks]));
router.put.apply(router, ["/:id"].concat(protect, [_taskController.updateTask]));
router["delete"].apply(router, ["/:id"].concat(protect, [_taskController.deleteTask]));
router.get("/all", _authMiddleware["default"], (0, _roleMiddleware.authorizeRoles)("admin"), _taskController.getAllTasks);
var _default = router;
exports["default"] = _default;