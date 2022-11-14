import * as React from "react";

// Static.
import styles from "./TwoSectionLayout.module.css";
import logoSrc from "@Presentation/Assets/images/logo.png";

// Features.
import ViewModel from "./TwoSectionLayoutViewModel";

// Components.
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { IconDashboard, IconHome, IconLogout } from "@tabler/icons";

// Utils.
import { URL_LOGOUT, URL_DASHBOARD, URL_WEBSITE } from "@Core/env";
import Avatar from "@Presentation/Components/Avatar/Avatar";

type Props = {
  children: ({ contentCLassName }: { contentCLassName: string }) => JSX.Element;
};

/**
 * A layout consisting of two sections:
 * 1. The navbar.
 * 2. The content.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function TwoSectionLayout({ children }: Props): JSX.Element {
  return (
    <ViewModel>
      {({ user }) => (
        <>
          <header
            className={`z-10 px-3 px-md-4 bg-white border-bottom d-flex align-items-center justify-content-between ${styles.header}`}
          >
            <img
              src={logoSrc}
              alt="TheTutor.me"
              className="img-fluid"
              style={{ height: "2rem" }}
            />
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                tag="button"
                className="rounded-pill bg-gray-200 d-flex align-items-center gap-2 px-2 py-0"
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
          </header>
          {children({
            contentCLassName: styles.content,
          })}
        </>
      )}
    </ViewModel>
  );
}
