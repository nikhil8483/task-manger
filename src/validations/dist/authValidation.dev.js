"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupRules = void 0;
var signupRules = {
  name: {
    required: true,
    minLength: 3
  },
  email: {
    required: true,
    type: "email"
  },
  password: {
    required: true,
    minLength: 6
  }
};
exports.signupRules = signupRules;