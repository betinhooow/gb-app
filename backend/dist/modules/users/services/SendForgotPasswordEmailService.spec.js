"use strict";

require("reflect-metadata");

var _MockMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/mocks/MockMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _MockUserTokensRepository = _interopRequireDefault(require("../repositories/mocks/MockUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockMailProvider;
let mockUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockMailProvider = new _MockMailProvider.default();
    mockUserTokensRepository = new _MockUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(mockUsersRepository, mockMailProvider, mockUserTokensRepository);
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(mockMailProvider, 'sendMail');
    await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non existing password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(mockUserTokensRepository, 'generate');
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    });
    expect(generateToken).toBeCalledWith(user.id);
  });
});