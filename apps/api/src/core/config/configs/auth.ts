export function loadAuthConfig() {
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN
    ? parseInt(process.env.JWT_EXPIRES_IN, 10)
    : 1000 * 60 * 60 * 24; // 1 day

  return {
    jwtSecret:
      process.env.JWT_SECRET ||
      "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
    jwtExpiresIn,
    login: process.env.LOGIN || "John",
    password: process.env.PASSWORD || "pass1",
  };
}
export type AuthConfig = ReturnType<typeof loadAuthConfig>;
