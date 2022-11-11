import * as React from "react";
import { useHistory } from "react-router-dom";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

// Static.
import styles from "../Viewer.module.css";
import { IconButton } from "@Presentation/Components/IconButton";

// Features.
import ViewModel from "./ViewerSidebarViewModel";
import ViewerSidebarRenderer from "./ViewerSidebarRenderer";

/**
 * Switch between the sidebar's states.
 *
 * @param {HTMLDivElement} sidebar The actual HTML node.
 *
 * @returns {void}
 */
function switchSidebarState(sidebar: HTMLDivElement | null): void {
  if (!sidebar) return;

  sidebar.hasAttribute("data-compact")
    ? sidebar.removeAttribute("data-compact")
    : sidebar.setAttribute("data-compact", "true");
}

/**
 * Sidebar for the Viewer.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 * @version 0.0.1
 */
export default function ViewerSidebar(): JSX.Element {
  const history = useHistory();
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <aside
      ref={sidebarRef}
      // rtl makes the sidebar appear on the left.
      // It's overwritten by the content below to make that appear normally.
      className={`p-3 dir-rtl bg-gray-100 border-end ${styles.sidebar}`}
    >
      {/* Content. */}
      <div className="dir-ltr h-100 d-flex flex-column gap-3">
        <header className="d-flex gap-3 align-items-center text-secondary">
          <IconButton onClick={() => history.goBack()}>
            <IconChevronLeft size={16} />
          </IconButton>
          <span className={styles["hide-when-compact"]}>Back</span>
        </header>
        <ViewModel>
          {({ state, requestState, onClickPage }) => (
            <ViewerSidebarRenderer
              {...requestState}
              onClickPage={onClickPage}
              materialPages={state.materialPages}
            />
          )}
        </ViewModel>
      </div>
      {/* Controller. */}
      <IconButton
        className={`border-secondary ${styles.controller}`}
        onClick={() => switchSidebarState(sidebarRef.current)}
      >
        <IconChevronRight size={16} />
      </IconButton>
    </aside>
  );
}
