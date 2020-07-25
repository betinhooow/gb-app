"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _notification = _interopRequireDefault(require("../../infra/typeorm/schemas/notification"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MockNotificationsRepository {
  constructor() {
    this.notifications = [];
  }

  async create({
    content,
    recipient_id
  }) {
    const notification = new _notification.default();
    Object.assign(notification, {
      content,
      recipient_id,
      id: new _mongodb.ObjectId()
    });
    this.notifications.push(notification);
    return notification;
  }

}

var _default = MockNotificationsRepository;
exports.default = _default;