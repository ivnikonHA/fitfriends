export interface JwtToken {
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresIn: Date;
}
