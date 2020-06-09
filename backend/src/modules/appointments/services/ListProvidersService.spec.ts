import 'reflect-metadata';
import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRepository';
import MockCacheProvider from '@shared/container/providers/CacheProvider/mocks/MockCacheProvider';
import ListProvidersService from './ListProvidersService';

let mockUsersRepository: MockUsersRepository;
let mockCacheProvider: MockCacheProvider;
let listProviders: ListProvidersService;

describe('ListProvidersServices', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockCacheProvider = new MockCacheProvider();

    listProviders = new ListProvidersService(
      mockUsersRepository,
      mockCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await mockUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggedUser = await mockUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
