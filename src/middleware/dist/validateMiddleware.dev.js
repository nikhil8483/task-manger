"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

var _sanitize = require("../utils/sanitize.js");

var validate = function validate(rules) {
  return function (req, res, next) {
    var data = (0, _sanitize.sanitize)(req.body);
    var errors = {};

    for (var field in rules) {
      var value = data[field];
      var rule = rules[field]; // required

      if (rule.required && !value) {
        errors[field] = "".concat(field, " is required");
        continue;
      } // min length


      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = "".concat(field, " must be at least ").concat(rule.minLength, " characters");
      } // email check


      if (rule.type === "email") {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          errors[field] = "Invalid email format";
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }

    req.body = data; // 🔥 sanitized data replace

    next();
  };
};

exports.validate = validate;