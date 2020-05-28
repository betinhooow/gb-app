import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import ShowProfileService from './ShowProfileService';

let mockUsersRepository: MockUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();

    showProfile = new ShowProfileService(mockUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
