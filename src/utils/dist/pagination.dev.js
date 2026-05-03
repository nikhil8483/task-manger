"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getPagination = function getPagination(query) {
  var _query$page = query.page,
      page = _query$page === void 0 ? 1 : _query$page,
      _query$limit = query.limit,
      limit = _query$limit === void 0 ? 10 : _query$limit;
  page = parseInt(page);
  limit = parseInt(limit);
  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 10;
  var offset = (page - 1) * limit;
  return {
    page: page,
    limit: limit,
    offset: offset
  };
};

var _default = getPagination;
exports["default"] = _default;