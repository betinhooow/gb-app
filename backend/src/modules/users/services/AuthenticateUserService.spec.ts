import 'reflect-metadata';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUserService = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
