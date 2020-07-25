"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _MockUsersRepository = _interopRequireDefault(require("../repositories/mocks/MockUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mockUsersRepository;
let showProfile;
describe('UpdateProfileService', () => {
  beforeEach(() => {
    mockUsersRepository = new _MockUsersRepository.default();
    showProfile = new _ShowProfileService.default(mockUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await mockUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('should be able to show the profile from non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non-existing-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});