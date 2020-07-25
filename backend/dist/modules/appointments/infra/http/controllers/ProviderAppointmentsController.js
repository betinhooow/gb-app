"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderAppointmentService = _interopRequireDefault(require("../../../services/ListProviderAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderAppointments = _tsyringe.container.resolve(_ListProviderAppointmentService.default);

    const appointments = await listProviderAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id
    });
    return response.json(appointments);
  }

}

exports.default = ProviderAppointmentsController;