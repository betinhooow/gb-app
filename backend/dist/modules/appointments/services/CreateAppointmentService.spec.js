"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/mocks/MockNotificationsRepository"));

var _MockCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/MockCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _MockAppointmentsRepository = _interopRequireDefault(require("../repositories/mocks/MockAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockAppointmentsRepository;
let mockNotificationRepository;
let mockCacheProvider;
let createAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new _MockAppointmentsRepository.default();
    mockNotificationRepository = new _MockNotificationsRepository.default();
    mockCacheProvider = new _MockCacheProvider.default();
    createAppointmentService = new _CreateAppointmentService.default(mockAppointmentsRepository, mockNotificationRepository, mockCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '1',
      provider_id: 'provider-id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });
  it('should not be able to create two appointments in same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 4, 30, 13);
    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '1',
      provider_id: 'provider-id'
    });
    await expect(createAppointmentService.execute({
      date: appointmentDate,
      user_id: '1',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '1',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '1',
      provider_id: '1'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8 and after 17', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '1',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '1',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});