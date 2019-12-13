import { LocalSignInStrategy } from './local-sign-in.strategy';

describe('LocalSignInStrategy', () => {
  it('should be defined', () => {
    expect(new LocalSignInStrategy({} as any)).toBeDefined();
  });
});
