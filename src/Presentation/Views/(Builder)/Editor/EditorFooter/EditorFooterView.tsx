import * as React from "react";
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {
  URL_WEBSITE,
  URL_DASHBOARD,
  URL_DASHBOARD_CONTENT_BUILDER,
} from "src/env";
import { IconArrowsMaximize, IconHome } from "@tabler/icons";
import EditorSettingsModal from "../Modals/EditorSettingsModal";
import { Pagination } from "@Presentation/Components/Pagination";

// Types.
import type { EditorFooterState } from "../EditorTypes";
import EditorContext from "../EditorContext";

export default function EditorFooterView({
  onChangePage,
  onRequestFullscreen,
}: EditorFooterState) {
  const { state, helpers } = React.useContext(EditorContext);

  const { currentPage } = helpers;
  const { materialPages } = state;

  return (
    <footer className="px-3 px-md-4 py-2 border-top bg-white">
      <nav className="d-flex gap-2 justify-content-end">
        <Pagination
          itemsPerPage={1}
          totalItems={materialPages.length}
          {...{ currentPage, onChangePage }}
        />
        {/* Settings modal */}
        <EditorSettingsModal />
        {/* Home button */}
        <UncontrolledDropdown direction="up">
          <DropdownToggle
            tag="button"
            title="Home"
            className="btn border rounded bg-light fs-6"
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
        </UncontrolledDropdown>
        {/* Fullscreen button. */}
        <button
          type="button"
          title="Fullscreen"
          onClick={onRequestFullscreen}
          className="btn border rounded bg-light fs-6"
        >
          <IconArrowsMaximize />
        </button>
      </nav>
    </footer>
  );
}
