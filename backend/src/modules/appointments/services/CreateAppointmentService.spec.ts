import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be abble to create a new appointment', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(
      mockAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointments in same time', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(
      mockAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 30, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
