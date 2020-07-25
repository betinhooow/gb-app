"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

require("reflect-metadata");

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

var _MockHashProvider = _interopRequireDefault(require("../providers/HashProvider/mocks/MockHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockHashProvider;
let updateProfileService;
describe('UpdateProfileService', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockHashProvider = new _MockHashProvider.default();
    updateProfileService = new _UpdateProfileService.default(mockUsersRepository, mockHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com'
    });
    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });
  it('should be able to show the profile from non-existing profile', async () => {
    expect(updateProfileService.execute({
      user_id: 'non-existing-user-id',
      name: 'non-existing-user-name',
      email: 'non-existing-user-email'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the email to an existing email', async () => {
    await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user = await mockUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123',
      old_password: '123456'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should be able to update the password without old password', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password with wrong old password', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123',
      old_password: 'wrong-old-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});