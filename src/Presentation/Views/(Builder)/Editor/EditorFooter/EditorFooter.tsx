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
import { EDITOR_ID } from "../EditorContext";
import { IconArrowsMaximize, IconHome } from "@tabler/icons";
import EditorSettingsModal from "../Modals/EditorSettingsModal";
import styles from "./Editor.module.css";
import ViewModel from "./EditorFooterViewModel";
import View from "./EditorFooterView";

export default function EditorFooter(props: any) {
  return <ViewModel>{(state) => <View {...state} {...props} />}</ViewModel>;
}
