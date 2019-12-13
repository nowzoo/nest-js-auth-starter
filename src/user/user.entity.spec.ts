import { User } from './user.entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
