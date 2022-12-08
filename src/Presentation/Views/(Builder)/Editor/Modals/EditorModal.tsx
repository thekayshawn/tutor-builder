import * as React from "react";
import { IconSettings } from "@tabler/icons";
import useToggleState from "@Core/Hooks/useToggleState";
import {
  Row,
  Col,
  Modal,
  Button,
  FormGroup,
  ModalBody,
  ModalProps,
} from "reactstrap";
import type { ModalHeaderProps } from "@Presentation/Components/Modals";
import { ModalFileInput, ModalHeader } from "@Presentation/Components/Modals";

export type EditorModalProps = {
  title: ModalHeaderProps["title"];

  /**
   * Additional props for the modal's control button.
   */
  controlProps?: React.ComponentPropsWithoutRef<"button">;
} & Omit<ModalProps, "title">;

export default function EditorModal({
  id,
  title,
  controlProps,
}: EditorModalProps) {
  const uniqueID = React.useId();
  const finalID = id || `modal-${uniqueID}`;

  const [isOpen, toggleIsOpen] = useToggleState();

  return (
    <>
      <button
        {...controlProps}
        onClick={toggleIsOpen}
        aria-controls={finalID}
        className={`btn border rounded bg-light fs-5 ${controlProps?.className}`}
      >
        <IconSettings />
      </button>
      <Modal {...{ isOpen }} toggle={toggleIsOpen}>
        <ModalHeader {...{ title }} onClose={toggleIsOpen} />
        <ModalBody>
          <form
            encType="multipart/form-data"
            // onSubmit={(e) => {
            //   toast.dismiss();
            //   e.preventDefault();

            //   onUpdateContentListener((_, burger) => {
            //     onCreatePage({
            //       burger,
            //       event: e,
            //       data: {
            //         title: newPageModal.title,
            //         thumbnail: newPageModal.thumbnail,
            //         description: newPageModal.description,
            //         content_id: pageMetaData.content_id,
            //       },
            //     });

            //     onToggleModal("newPageModal");
            //   });
            // }}
          >
            <Row>
              <Col xs={12} md={3}>
                <ModalFileInput
                  id={`input-${finalID}`}
                  onChange={() => console.log()}
                />
              </Col>
              <Col xs={12} md={9}>
                <FormGroup>
                  <input
                    required
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter A Title"
                    // value={editPageModal.title}
                    // onChange={(e) => onChangeText("editPageModal", e)}
                  />
                </FormGroup>
                <FormGroup>
                  <textarea
                    required
                    rows={4}
                    cols={50}
                    name="description"
                    className="form-control"
                    placeholder="Enter properties of the new page"
                    // value={editPageModal.description}
                    // onChange={(e) => onChangeText("editPageModal", e)}
                  ></textarea>
                </FormGroup>
                <Button color="success" type="submit">
                  Update the page
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
