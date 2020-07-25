"use strict";

require("reflect-metadata");

var _MockUsersRepository = _interopRequireDefault(require("../../users/repositories/mocks/MockUsersRepository"));

var _MockCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/mocks/MockCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockCacheProvider;
let listProviders;
describe('ListProvidersServices', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockCacheProvider = new _MockCacheProvider.default();
    listProviders = new _ListProvidersService.default(mockUsersRepository, mockCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user2 = await mockUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456'
    });
    const loggedUser = await mockUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});