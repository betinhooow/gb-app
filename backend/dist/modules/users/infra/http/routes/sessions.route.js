"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _SessionController = _interopRequireDefault(require("../controllers/SessionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
const sessionController = new _SessionController.default();
sessionsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _joi.default.string().email().required(),
    password: _joi.default.string().required()
  }
}), sessionController.create);
var _default = sessionsRouter;
exports.default = _default;