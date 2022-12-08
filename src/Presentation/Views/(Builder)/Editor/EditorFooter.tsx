import * as React from "react";
import {
  Dropdown,
  Pagination,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import {
  URL_WEBSITE,
  URL_DASHBOARD,
  URL_DASHBOARD_CONTENT_BUILDER,
} from "src/env";
import { IconArrowsMaximize, IconHome, IconSettings } from "@tabler/icons";

type Props = {};

export default function EditorFooter({}: Props) {
  return (
    <>
      <div className="back_rounds"></div>
      <nav
        style={{ zIndex: 100 }}
        className="position-fixed bottom-0 end-0 m-2 d-flex align-items-center gap-2"
      >
        <Pagination
          type="pages"
          itemsPerPage={1}
          {...{ currentPage, totalItems, onChangePage }}
        />
        {/* Settings button. */}
        <button
          type="button"
          role="tooltip"
          aria-label="Edit this page"
          data-microtip-position="top"
          className="btn border rounded bg-light fs-5"
          onClick={onOpenSettingsModal}
        >
          <IconSettings />
        </button>
        {/* Home button. */}
        <Dropdown
          direction="up"
          isOpen={isMenuDropdownOpen}
          toggle={() =>
            setState((lastState) => ({
              ...lastState,
              isMenuDropdownOpen: !lastState.isMenuDropdownOpen,
            }))
          }
        >
          <DropdownToggle
            tag="button"
            role="tooltip"
            aria-label="Home"
            data-microtip-position="top"
            className="btn border rounded bg-light fs-5"
          >
            <IconHome />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="a"
              target="_blank"
              rel="noreferrer"
              href={URL_WEBSITE}
              className="text-secondary"
            >
              Home
            </DropdownItem>
            <DropdownItem
              tag="a"
              target="_blank"
              rel="noreferrer"
              className="text-secondary"
              href={URL_DASHBOARD_CONTENT_BUILDER}
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              tag="a"
              target="_blank"
              rel="noreferrer"
              className="text-secondary"
              href={`${URL_DASHBOARD}/support`}
            >
              Help
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Fullscreen button. */}
        <button
          type="button"
          role="tooltip"
          aria-label="Fullscreen"
          data-microtip-position="top-left"
          className="btn border rounded bg-light fs-5"
          onClick={() =>
            document.getElementById("main_content")?.requestFullscreen()
          }
        >
          <IconArrowsMaximize />
        </button>
      </nav>
    </>
  );
}
