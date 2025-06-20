export interface IconProps {
  height?: string;
  width?: string;
}


export interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
}
export interface NewUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'mother' | 'facilitator';
}

export type UserLoginData = {
  identifier: string;
  password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type NullableTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};