"use strict";

require("reflect-metadata");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

var _MockAppointmentsRepository = _interopRequireDefault(require("../repositories/mocks/MockAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockAppointmentsRepository;
let listProviderDayAvailability;
describe('LisrProviderDayAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new _MockAppointmentsRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabilityService.default(mockAppointmentsRepository);
  });
  it('should be able to list the day availability from provider', async () => {
    await mockAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '1',
      date: new Date(2020, 4, 20, 14, 0, 8)
    });
    await mockAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '1',
      date: new Date(2020, 4, 20, 15, 0, 8)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 13,
      available: true
    }, {
      hour: 14,
      available: false
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});