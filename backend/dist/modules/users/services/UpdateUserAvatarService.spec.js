"use strict";

require("reflect-metadata");

var _MockStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/mocks/MockStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let mockDiskStorageProvider;
let updateUserAvatar;
describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    mockDiskStorageProvider = new _MockStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(mockUsersRepository, mockDiskStorageProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from a non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(mockDiskStorageProvider, 'deleteFile');
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});