import 'reflect-metadata';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import MockUserTokensRepository from '../repositories/mocks/MockUserTokensRepository';

let mockUsersRepository: MockUsersRepository;
let mockUserTokensRepository: MockUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      mockUsersRepository,
      mockUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await mockUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await mockUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
