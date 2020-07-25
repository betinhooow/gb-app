"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _MockUserTokensRepository = _interopRequireDefault(require("../repositories/mocks/MockUserTokensRepository"));

var _MockHashProvider = _interopRequireDefault(require("../providers/HashProvider/mocks/MockHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockUserTokensRepository;
let mockHashProvider;
let resetPasswordService;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockUserTokensRepository = new _MockUserTokensRepository.default();
    mockHashProvider = new _MockHashProvider.default();
    resetPasswordService = new _ResetPasswordService.default(mockUsersRepository, mockUserTokensRepository, mockHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const {
      token
    } = await mockUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(mockHashProvider, 'generateHash');
    await resetPasswordService.execute({
      password: '123123',
      token
    });
    const updatedUser = await mockUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('123123');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPasswordService.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const {
      token
    } = await mockUserTokensRepository.generate('non-existing-user');
    await expect(resetPasswordService.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be not able to reset the password after 2 hours', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const {
      token
    } = await mockUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPasswordService.execute({
      password: '123123',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});