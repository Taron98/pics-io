/** @format */

export type SignUpRequestType = {
  username: string;
  password: string;
};

export type SignUpResponseType = {
  username: string;
  password: string;
};

export type SignInRequestType = {
  username: string;
  password: string;
};

export type UserResponseType = {
  username: string;
};
export type SignInResponseType = {
  user: UserResponseType;
  token: string;
};
