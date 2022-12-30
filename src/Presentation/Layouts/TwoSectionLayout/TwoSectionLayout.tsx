import * as React from "react";

// Static.
import styles from "./TwoSectionLayout.module.css";
import logoSrc from "@Presentation/Assets/images/logo.png";
import { Link } from "react-router-dom";

type Props = {
  /**
   * Element to place in the navbar, next to the branding logo.
   */
  header?: React.ReactNode;
  children: ({ contentClassName }: { contentClassName: string }) => JSX.Element;
};

/**
 * A layout consisting of two sections:
 * 1. The navbar.
 * 2. The content.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.3
 *
 * @changelog
 * - 0.0.4: Removed unused viewModel.
 * - 0.0.2: Extracted the user-profile dropdown to a standalone component.
 * - 0.0.1: Initial version.
 */
export default function TwoSectionLayout({
  header,
  children,
}: Props): JSX.Element {
  return (
    <>
      <header
        className={`z-10 px-3 px-md-4 bg-white border-bottom d-flex align-items-center justify-content-between ${styles.header}`}
      >
        <Link to="/">
          <img
            src={logoSrc}
            alt="TheTutor.me"
            className="img-fluid"
            style={{ height: "2rem" }}
          />
        </Link>
        {header}
      </header>
      {children({
        contentClassName: styles.content,
      })}
    </>
  );
}
