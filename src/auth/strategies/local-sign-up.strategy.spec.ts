import { LocalSignUpStrategy } from './local-sign-up.strategy';

describe('LocalSignUpStrategy', () => {
  it('should be defined', () => {
    expect(new LocalSignUpStrategy({} as any)).toBeDefined();
  });
});
