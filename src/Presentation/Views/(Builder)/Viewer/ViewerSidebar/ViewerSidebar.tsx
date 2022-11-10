import * as React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

// Static.
import styles from "../Viewer.module.css";
import { IconButton } from "../../../../Components/IconButton";

// Features.
import ViewerSidebarViewModel from "./ViewerSidebarViewModel";

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
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <ViewerSidebarViewModel>
      {/* // The direction is set to rtl in order to make the sidebar appear on the left. */}
      <aside
        ref={sidebarRef}
        className={`p-3 dir-rtl bg-gray-100 border-end ${styles.sidebar}`}
      >
        {/* Controller. */}
        <IconButton
          className={`border-secondary ${styles.controller}`}
          onClick={() => switchSidebarState(sidebarRef.current)}
        >
          <IconChevronRight size={16} />
        </IconButton>
        {/* Content. */}
        <div className="dir-ltr d-flex flex-column gap-3">
          <header className="d-flex gap-2 align-items-center">
            <IconButton className="border-secondary">
              <IconChevronLeft size={16} />
            </IconButton>
            <span className={styles["hide-when-compact"]}>Back</span>
          </header>
        </div>
      </aside>
    </ViewerSidebarViewModel>
  );
}
