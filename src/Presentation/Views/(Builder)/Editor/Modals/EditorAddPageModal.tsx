import * as React from "react";

// Hooks.
import useForm from "@Core/Hooks/useForm";
import useBetterState from "@Core/Hooks/useBetterState";
import useToggleState from "@Core/Hooks/useToggleState";

// Components.
import { IconCirclePlus } from "@tabler/icons";
import EditorModal, { EditorModalProps } from "./EditorModal";
import { ModalFileInput } from "@Presentation/Components/Modals";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";

// Utils.
import integers from "@Core/Helpers/integers";
import { MAX_PARAGRAPH_LENGTH } from "src/env";
import { MAX_THUMBNAIL_SIZE } from "@Core/env";
import betterToast from "@Core/Helpers/betterToast";
import { getBase64FromFile } from "@Core/Helpers/utils";
import strings, { messages } from "@Core/Helpers/strings";

// Types.
import type { EditorHeaderState } from "../EditorTypes";
import type { LearningMaterialPage } from "@Data/Entities/LearningMaterialPageEntity";

export type EditorAddPageModalProps = {
  onAdd: EditorHeaderState["onAdd"];
  controlProps: EditorModalProps["controlProps"];
};

/**
 * Modal to control the settings of a page within the content builder's editor.
 *
 * @returns {JSX.Element}
 */
export default function EditorAddPageModal({
  onAdd,
  controlProps,
}: EditorAddPageModalProps): JSX.Element {
  const submissionHandler = useForm();
  const [isOpen, toggleIsOpen] = useToggleState();
  const [formState, setFormState] = useBetterState<
    Omit<LearningMaterialPage, "id" | "materialID">
  >({
    title: "",
    thumbnail: "",
    description: "",
  });

  function onChangeFile(file: File) {
    if (file.size > MAX_THUMBNAIL_SIZE * integers.MEGA_BYTE) {
      betterToast.error({
        message: messages.FILE_SIZE_EXCEEDED(MAX_THUMBNAIL_SIZE),
      });
      return;
    }

    getBase64FromFile(file)
      .then((base64) => setFormState("thumbnail", base64))
      .catch(() =>
        betterToast.error({ message: strings.DEFAULT_ERROR_MESSAGE })
      );
  }

  function onSubmit(_: React.FormEvent<HTMLFormElement>) {
    onAdd({
      title: formState.title,
      thumbnail: formState.thumbnail,
      description: formState.description,
    });
  }

  return (
    <EditorModal
      id="editorAddPageModal"
      icon={<IconCirclePlus />}
      title="Enter properties of the new page"
      {...{ isOpen, toggleIsOpen, controlProps }}
    >
      <Form
        encType="multipart/form-data"
        onSubmit={(e) => submissionHandler(e, onSubmit)}
      >
        <Row className="g-3">
          <Col xs={12} md={3}>
            <ModalFileInput
              id="editorAddPageModalFile"
              value={formState.thumbnail}
              onChange={(_, file) => onChangeFile(file)}
            />
          </Col>
          <Col xs={12} md={9}>
            <FormGroup>
              <Input
                required
                type="text"
                name="title"
                maxLength={255}
                value={formState.title}
                placeholder="Enter A Title"
                onChange={(e) => setFormState("title", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                rows={4}
                cols={50}
                type="textarea"
                name="description"
                className="form-control"
                value={formState.description}
                maxLength={MAX_PARAGRAPH_LENGTH}
                placeholder="Enter A Short Description"
                onChange={(e) => setFormState("description", e.target.value)}
              ></Input>
            </FormGroup>
            <Button color="success" type="submit">
              Add new page
            </Button>
          </Col>
        </Row>
      </Form>
    </EditorModal>
  );
}
