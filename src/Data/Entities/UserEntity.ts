export type UserType = "tutor" | "learner";

/**
 * The user entity used throughout the app. Generated after the raw siblings
 * gets passed through an adapter.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  dob: string;
  phone: string;
  isVerified: boolean;
  timezoneName: string;
}

/**
 * The user entity retrived from the API.
 */
export interface RawUser {
  id: string;
  name: string;
  email: string;
  user_type: UserType;
  dob: string;
  mobile_number: string;
  verification_status: 1 | 0;
  timezone: string;
}
