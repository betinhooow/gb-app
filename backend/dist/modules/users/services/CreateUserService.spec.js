"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/MockCacheProvider"));

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _MockHashProvider = _interopRequireDefault(require("../providers/HashProvider/mocks/MockHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockHashProvider;
let mockCacheProvider;
let createUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockHashProvider = new _MockHashProvider.default();
    mockCacheProvider = new _MockCacheProvider.default();
    createUserService = new _CreateUserService.default(mockUsersRepository, mockHashProvider, mockCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});