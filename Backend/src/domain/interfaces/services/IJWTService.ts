export default interface IJWTService {
  createRefreshToken(email: string, id: string): string;
  verifyRefreshToken(token: string): { email: string; id: string };
  createAccessToken(email: string, id: string): string;
  verifyAccessToken(token: string): { email: string; id: string };
}
