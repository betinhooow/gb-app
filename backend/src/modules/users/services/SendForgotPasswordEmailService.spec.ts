import 'reflect-metadata';
import MockMailProvider from '@shared/container/providers/MailProvider/mocks/MockMailProvider';
import AppError from '@shared/error/AppError';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import MockUserTokensRepository from '../repositories/mocks/MockUserTokensRepository';

let mockUsersRepository: MockUsersRepository;
let mockMailProvider: MockMailProvider;
let mockUserTokensRepository: MockUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockMailProvider = new MockMailProvider();
    mockUserTokensRepository = new MockUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
      mockUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(mockMailProvider, 'sendMail');

    await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(mockUserTokensRepository, 'generate');

    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
