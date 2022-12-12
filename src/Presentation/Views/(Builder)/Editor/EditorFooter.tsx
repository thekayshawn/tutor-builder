import * as React from "react";
import {
  Pagination,
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
import EditorContext, { EDITOR_ID } from "./EditorContext";
import { IconArrowsMaximize, IconHome } from "@tabler/icons";
import EditorSettingsModal from "./Modals/EditorSettingsModal";
import styles from "./Editor.module.css";
import { getEditorRoute } from "@Core/Helpers/routerFunctions";

type Props = {};

export default function EditorFooter({}: Props) {
  const { state, setState } = React.useContext(EditorContext);

  const {currentPage, materialPages, selectedMaterialPage} = state

  function onChangePage(newPage: number) {
    getEditorRoute({
      page: newPage,
      id: selectedMaterialPage?.id,
      slug: selectedMaterialPage.
    })
  }

  return (
    <footer className={styles.header}>
      <nav
        style={{ zIndex: 100 }}
        className="m-2 d-flex align-items-center gap-2"
      >
        <Pagination
          type="pages"
          itemsPerPage={1}
          totalItems={materialPages.length}
          {...{ currentPage, onChangePage }}
        />
        {/* Settings button. */}
        <EditorSettingsModal />
        {/* Home button. */}
        <UncontrolledDropdown direction="up">
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
        </UncontrolledDropdown>
        {/* Fullscreen button. */}
        <button
          type="button"
          role="tooltip"
          aria-label="Fullscreen"
          data-microtip-position="top-left"
          className="btn border rounded bg-light fs-5"
          onClick={() =>
            document.getElementById(EDITOR_ID)?.requestFullscreen()
          }
        >
          <IconArrowsMaximize />
        </button>
      </nav>
    </footer>
  );
}
