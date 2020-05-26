import 'reflect-metadata';
import MockMailProvider from '@shared/container/providers/MailProvider/mocks/MockMailProvider';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be abble to recover the password using the email', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockMailProvider = new MockMailProvider();

    const sendMail = jest.spyOn(mockMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
    );

    await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

    expect(sendMail).toHaveBeenCalled();
  });
});
