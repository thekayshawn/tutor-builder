/* eslint-disable eqeqeq */
import type { User, RawUser } from "../Entities/UserEntity";

export default class UserAdapter {
  serialize(state: User): RawUser {
    return {
      id: state.id || "",
      name: state.name || "",
      email: state.email || "",
      user_type: state.userType || "tutor",
      access_token: state.accessToken,
      dob: state.dob || "",
      mobile_number: state.phone || "",
      verification_status: state.isVerified ? 1 : 0,
      timezone: state.timezoneName || "",
      profile_picture: state.profilePicture || "",
    };
  }

  deserialize(state: RawUser): User {
    return {
      id: state.id || "",
      name: state.name || "",
      email: state.email || "",
      userType: state.user_type || "tutor",
      accessToken: state.access_token,
      dob: state.dob || "",
      phone: state.mobile_number || "",
      isVerified: state.verification_status == 1,
      timezoneName: state.timezone,
      profilePicture: state.profile_picture || "",
    };
  }
}
