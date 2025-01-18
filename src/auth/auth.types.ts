export type AuthInput = {
  userName: string;
  password: string;
};

export type SignInData = {
  id: number;
  userName: string;
};

export type AuthResult = {
  accessToken: string;
  id: number;
  userName: string;
};
