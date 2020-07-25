"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _celebrate = require("celebrate");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default();
profileRouter.use(_ensureAuthenticated.default);
profileRouter.get('/', profileController.show);
profileRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _joi.default.string().required(),
    email: _joi.default.string().email().required(),
    password: _joi.default.string(),
    old_password: _joi.default.string(),
    password_confirmation: _joi.default.string().valid(_joi.default.ref('password'))
  }
}), profileController.update);
var _default = profileRouter;
exports.default = _default;