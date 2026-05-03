"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizeRoles = void 0;

var authorizeRoles = function authorizeRoles() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    next();
  };
};

exports.authorizeRoles = authorizeRoles;