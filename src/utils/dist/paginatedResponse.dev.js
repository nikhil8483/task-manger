"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginatedResponse = void 0;

var paginatedResponse = function paginatedResponse(_ref) {
  var data = _ref.data,
      total = _ref.total,
      page = _ref.page,
      limit = _ref.limit;
  var totalPages = Math.ceil(total / limit);
  return {
    success: true,
    page: page,
    limit: limit,
    total: total,
    totalPages: totalPages,
    data: data
  };
};

exports.paginatedResponse = paginatedResponse;