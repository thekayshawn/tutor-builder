import * as React from "react";
import { IconSettings } from "@tabler/icons";
import useToggleState from "@Core/Hooks/useToggleState";
import { Button, Col, FormGroup, Modal, ModalBody, Row } from "reactstrap";
import { ModalFileInput, ModalHeader } from "@Presentation/Components/Modals";

export default function EditorAddPageModal() {
  const [isOpen, toggleIsOpen] = useToggleState();

  return (
    <>
      <button
        type="button"
        role="tooltip"
        onClick={toggleIsOpen}
        aria-label="Edit this page"
        data-microtip-position="top"
        className="btn border rounded bg-light fs-5"
      >
        <IconSettings />
      </button>
      <Modal {...{ isOpen }} toggle={toggleIsOpen}>
        <ModalHeader
          onClose={toggleIsOpen}
          title="Modify the currently opened page"
        />
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
                  id="addPageModalFile"
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
