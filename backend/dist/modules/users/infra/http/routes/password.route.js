"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _ForgotPasswordController = _interopRequireDefault(require("../controllers/ForgotPasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRouter = (0, _express.Router)();
const forgotPasswordController = new _ForgotPasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
passwordRouter.post('/forgot', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _joi.default.string().email().required()
  }
}), forgotPasswordController.create);
passwordRouter.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _joi.default.string().uuid().required(),
    password: _joi.default.string().required(),
    password_confirmation: _joi.default.string().required().valid(_joi.default.ref('password'))
  }
}), resetPasswordController.create);
var _default = passwordRouter;
exports.default = _default;