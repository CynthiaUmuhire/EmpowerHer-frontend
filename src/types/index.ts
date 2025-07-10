export interface IconProps {
  height?: string;
  width?: string;
}

export enum RegistrationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}
export interface Registration {
  id: number;
  documentId: User;
  notes: string;
  registrationStatus: RegistrationStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
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
  documentId: string;
  registrations?: Registration[];
  firstName: string;
  lastName: string;
  shotBio?: string;
  district?: string;
  age?: string;
  approvedRegistrations?: Registration[];
  upComingEvents?: unknown[];
}
export interface NewUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'mother' | 'facilitator';
  firstName: string;
  lastName: string;
}

export type UserLoginData = {
  identifier: string;
  password: string;
};

export type adminLoginData = {
  email: string;
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
  district?: string;
  region?: string;
}

export enum GroupStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  REVIEWING = 'Reviewing'
}

// Dashboard Types
export interface DistrictStats {
  district: string;
  count: number;
}

export interface GroupStats {
  groupId: string;
  groupName: string;
  memberCount: number;
  district: string;
}

export interface DashboardStats {
  totalMothers: number;
  totalGroups: number;
  districtDistribution: DistrictStats[];
  groupMembership: GroupStats[];
}

export interface Event {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image?: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  } | null | string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  groupName?: string;
  eventStatus: string;
  rsvpStatus: string | null;
  eventId: string;
  rsvps: {
    user: User;
    rsvpValue: string;
    documentId: string;
  }[];
  group?: Group
}