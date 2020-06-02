import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';

let mockAppointmentsRepository: MockAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: '1',
      provider_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointments in same time', async () => {
    const appointmentDate = new Date(2020, 4, 30, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '1',
      provider_id: '1',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '1',
        provider_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
