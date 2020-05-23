import 'reflect-metadata';
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
});
