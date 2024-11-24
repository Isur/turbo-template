export type JwtPayloadData = {
  id: number;
  name: string;
};

export type JwtPayload = {
  sub: number;
  iat: number;
  exp: number;
  payload: JwtPayloadData;
};
