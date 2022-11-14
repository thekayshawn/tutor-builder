import UserAdapter from "@Data/Adapters/UserAdapter";
import { RawUser, User } from "@Data/Entities/UserEntity";

type Props = {
  children: ({ user }: { user: User }) => JSX.Element;
};

/**
 * ViewModel for the TwoSectionLayout. Provides it with the user's data.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function TwoSectionLayoutViewModel({
  children,
}: Props): JSX.Element {
  const userAdapter = new UserAdapter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // User is always there due to the validation in the base file.
  return children({ user: userAdapter.deserialize(user as RawUser) });
}
