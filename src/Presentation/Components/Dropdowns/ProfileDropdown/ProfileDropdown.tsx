import * as React from "react";
import { User } from "@Data/Entities/UserEntity";
import Avatar from "@Presentation/Components/Avatar/Avatar";
import { URL_WEBSITE, URL_DASHBOARD, URL_LOGOUT } from "src/env";
import { IconHome, IconDashboard, IconLogout } from "@tabler/icons";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledDropdownProps,
} from "reactstrap";

type Props = { user: User } & UncontrolledDropdownProps;

export default function ProfileDropdown({ user, ...props }: Props) {
  return (
    <UncontrolledDropdown {...props}>
      <DropdownToggle
        caret
        tag="button"
        className="rounded-pill bg-light border-1 d-flex align-items-center gap-2 p-0 pe-2"
      >
        <Avatar
          src={user.profilePicture}
          style={{ width: "2rem", height: "2rem" }}
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() => window.open(URL_WEBSITE, "_blank")}
          className="d-flex align-items-center gap-2"
        >
          <IconHome size={20} /> Website
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            window.open(`${URL_DASHBOARD}/learning-materials`, "_blank")
          }
          className="d-flex mt-2 align-items-center gap-2"
        >
          <IconDashboard size={20} /> Dashboard
        </DropdownItem>
        <DropdownItem
          onClick={() => window.open(URL_LOGOUT)}
          className="d-flex mt-2 align-items-center gap-2"
        >
          <IconLogout size={20} /> Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
