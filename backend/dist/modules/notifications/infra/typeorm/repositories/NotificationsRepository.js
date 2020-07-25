"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _notification = _interopRequireDefault(require("../schemas/notification"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let NotificationsRepository = (_dec = (0, _typeorm.EntityRepository)(_notification.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class NotificationsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_notification.default, 'mongo');
  }

  async create({
    content,
    recipient_id
  }) {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    });
    await this.ormRepository.save(notification);
    return notification;
  }

}, _temp)) || _class) || _class) || _class);
var _default = NotificationsRepository;
exports.default = _default;