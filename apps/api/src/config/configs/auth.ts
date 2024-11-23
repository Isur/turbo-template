export function loadAuthConfig() {
  return {
    jwtSecret:
      process.env.JWT_SECRET ||
      "secretForJwtThat-no-one-knows-hehe-do-you-like-bananas?",
    jwtExpiresIn:
      parseInt(process.env.JWT_EXPIRES_IN, 10) || 1000 * 60 * 60 * 24, // 1 day
  };
}
export type AuthConfig = ReturnType<typeof loadAuthConfig>;
