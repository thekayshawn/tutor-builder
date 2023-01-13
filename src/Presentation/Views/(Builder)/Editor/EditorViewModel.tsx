import * as React from "react";
import { RequestState } from "@Data/Types";
import { useParams } from "react-router-dom";
import { MIN_WIDTH_BUILDER } from "@Core/env";
import EditorContext, { defaultEditorState } from "./EditorContext";
import useLearningMaterialPages from "@Core/Hooks/learning-materials/useLearningMaterialPages";

// Types.
import type { EditorRef, EditorState } from "./EditorTypes";
import useEditorHandlers from "./useEditorHandlers";
import BuilderControl from "src/components/contentbuilder/buildercontrol";
import { LearningMaterialPageContent } from "@Data/Entities/LearningMaterialPageContentEntity";
import strings from "@Core/Helpers/strings";
import { isEditorRef } from "./EditorGuards";

type Children = { requestState: RequestState };

type Props = {
  children: ({ requestState }: Children) => JSX.Element;
};

/**
 * ViewModel for the Builder's editor view.
 *
 * @returns {JSX.Element}
 *
 * @author kashan-ahmad
 *
 * @version 0.0.1
 */
export default function EditorViewModel({ children }: Props): JSX.Element {
  // The ID is always in the URL.
  const {
    slug,
    page = "1",
    id: materialID,
  } = useParams<{
    id?: string;
    page: string;
    slug: string;
  }>();

  // Search parameters are always strings.
  const parsedPage = parseInt(page);

  const [state, setState] = React.useState<EditorState>(defaultEditorState);

  // Handlers.
  const handlers = useEditorHandlers({ state, setState });

  // Local request state.
  const [requestState, setRequestState] = React.useState<RequestState>({
    // The app won't even load for smaller screens.
    status: window.screen.width < MIN_WIDTH_BUILDER ? "idle" : "loading",
  });

  // Fetch the pages by ID.
  useLearningMaterialPages({
    id: materialID,
    isIdle: requestState.status === "idle",
    onSuccess: (data) =>
      setState({
        ...state,
        materialPages: data,
        // Since pages start from 1, subtracting them by 1 gives us the
        // selected index.
        selectedMaterialPage: data[parsedPage - 1],
      }),
    onChangeRequestState: (newState) => setRequestState(newState),
  });

  const ref: EditorRef = {
    editor: React.createRef<BuilderControl>(),
    pageContent: React.useRef<LearningMaterialPageContent>(),
  };

  if (!isEditorRef(ref)) throw new Error(strings.DEFAULT_ERROR_MESSAGE);

  return (
    <EditorContext.Provider
      value={{
        ref,
        state,
        setState,
        handlers,
        helpers: {
          currentSlug: slug,
          currentPage: parsedPage,
        },
      }}
    >
      {children({ requestState })}
    </EditorContext.Provider>
  );
}
