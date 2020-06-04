import 'reflect-metadata';
import ListProviderAppointmentService from './ListProviderAppointmentService';
import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderAppointmentService: ListProviderAppointmentService;

describe('LisrProviderAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderAppointmentService = new ListProviderAppointmentService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await mockAppointmentsRepository.create({
      provider_id: 'provider-id',
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: '1',
    });

    const appointment2 = await mockAppointmentsRepository.create({
      provider_id: 'provider-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: '1',
    });

    const appointments = await listProviderAppointmentService.execute({
      provider_id: 'provider-id',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
