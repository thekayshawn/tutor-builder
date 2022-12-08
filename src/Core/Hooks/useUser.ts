import UserAdapter from "@Data/Adapters/UserAdapter";
import { RawUser, User } from "@Data/Entities/UserEntity";

/**
 * Provides the logged user's data.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function useUser(): User {
  const userAdapter = new UserAdapter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // User is always there due to the validation in the base file.
  return userAdapter.deserialize(user as RawUser);
}
