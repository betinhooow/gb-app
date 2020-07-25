"use strict";

require("reflect-metadata");

var _MockCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/MockCacheProvider"));

var _ListProviderAppointmentService = _interopRequireDefault(require("./ListProviderAppointmentService"));

var _MockAppointmentsRepository = _interopRequireDefault(require("../repositories/mocks/MockAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockAppointmentsRepository;
let mockCacheProvider;
let listProviderAppointmentService;
describe('LisrProviderAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new _MockAppointmentsRepository.default();
    mockCacheProvider = new _MockCacheProvider.default();
    listProviderAppointmentService = new _ListProviderAppointmentService.default(mockAppointmentsRepository, mockCacheProvider);
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await mockAppointmentsRepository.create({
      provider_id: 'provider-id',
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: '1'
    });
    const appointment2 = await mockAppointmentsRepository.create({
      provider_id: 'provider-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: '1'
    });
    const appointments = await listProviderAppointmentService.execute({
      provider_id: 'provider-id',
      day: 20,
      year: 2020,
      month: 5
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});