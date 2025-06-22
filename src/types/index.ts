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
  role: string;
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

export type Group = {
  id: number;
  name: string;
  description: string;
  email: string;
  isVerified: boolean;
  website: string;
  assistantContact: string;
  groupstatus: string;
  members: number;
  coverImage: string;
  documentId: string;
  createdAt: string;
}

export enum GroupStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  REVIEWING = 'Reviewing'
}

