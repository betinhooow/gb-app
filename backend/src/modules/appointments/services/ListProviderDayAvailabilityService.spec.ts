import 'reflect-metadata';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('LisrProviderDayAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 8),
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 8),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: true },
      ]),
    );
  });
});
