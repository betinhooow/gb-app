import 'reflect-metadata';
import AppError from '@shared/error/AppError';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import CreateUserService from './CreateUserService';
import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';

describe('CreateUser', () => {
  it('should be abble to create a new user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUserService = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be abble to create a new user with same email from another', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUserService = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
