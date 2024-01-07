import apiUrl from '../apiUrl';

describe('apiUrl', () => {
  test('returns NEXT_PUBLIC_BASE_URL if defined', () => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';

    expect(apiUrl()).toBe('https://example.com');
  });

  // Test when NEXT_PUBLIC_BASE_URL is not defined
  it('returns default value if NEXT_PUBLIC_BASE_URL is not defined', () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    expect(apiUrl()).toBe('http://localhost:3000');
  });

  // Clean up environment variable after tests
  afterAll(() => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
  });
});

