import * as React from "react";
import EditorModal from "./EditorModal";
import useForm from "@Core/Hooks/useForm";
import { MAX_PARAGRAPH_LENGTH } from "src/env";
import { IconCirclePlus } from "@tabler/icons";
import useToggleState from "@Core/Hooks/useToggleState";
import { ModalFileInput } from "@Presentation/Components/Modals";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";

/**
 * Modal to control the settings of a page within the content builder's editor.
 *
 * @returns {JSX.Element}
 */
export default function EditorAddPageModal(): JSX.Element {
  const submissionHandler = useForm();
  const [isOpen, toggleIsOpen] = useToggleState();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // onUpdateContentListener((_, burger) => {
    //   onCreatePage({
    //     burger,
    //     event: e,
    //     data: {
    //       title: newPageModal.title,
    //       thumbnail: newPageModal.thumbnail,
    //       description: newPageModal.description,
    //       content_id: pageMetaData.content_id,
    //     },
    //   });
    //   onToggleModal("newPageModal");
    // });
  }

  return (
    <EditorModal
      icon={<IconCirclePlus />}
      id="editorAddPageModal"
      title="Enter properties of the new page"
      {...{ isOpen, toggleIsOpen }}
    >
      <Form
        encType="multipart/form-data"
        onSubmit={(e) => submissionHandler(e, onSubmit)}
      >
        <Row>
          <Col xs={12} md={3}>
            {/* <ModalFileInput /> */}
          </Col>
          <Col xs={12} md={9}>
            <FormGroup>
              <Input
                required
                type="text"
                name="title"
                maxLength={255}
                placeholder="Enter A Title"
                // onChange={(e) => onChangeText("newPageModal", e)}
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
                maxLength={MAX_PARAGRAPH_LENGTH}
                placeholder="Enter A Short Description"
                // onChange={(e) => onChangeText("newPageModal", e)}
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
