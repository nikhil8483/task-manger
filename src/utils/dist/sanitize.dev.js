"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = void 0;

var sanitize = function sanitize(data) {
  var cleaned = {};

  for (var key in data) {
    var value = data[key];

    if (typeof value === "string") {
      value = value.trim();
      value = value.replace(/<[^>]*>?/gm, ""); // remove HTML tags
    }

    cleaned[key] = value;
  }

  return cleaned;
};

exports.sanitize = sanitize;