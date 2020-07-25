"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/MockCacheProvider"));

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _MockHashProvider = _interopRequireDefault(require("../providers/HashProvider/mocks/MockHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockHashProvider;
let mockCacheProvider;
let createUserService;
let authenticateUserService;
describe('AuthenticateUserService', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockHashProvider = new _MockHashProvider.default();
    mockCacheProvider = new _MockCacheProvider.default();
    createUserService = new _CreateUserService.default(mockUsersRepository, mockHashProvider, mockCacheProvider);
    authenticateUserService = new _AuthenticateUserService.default(mockUsersRepository, mockHashProvider);
  });
  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with a non existing user', async () => {
    await expect(authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with incorrect email or passowrd', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});