import * as React from "react";
import { Error403 } from "../../../components/error";

type Props = {
  userType: string;
  expectedUserType: "tutor" | "learner";
  children: React.ReactElement;
};

function ProtectedRoute({ userType, expectedUserType, children }: Props) {
  if (userType !== expectedUserType) return <Error403 />;

  return children;
}

export default ProtectedRoute;
