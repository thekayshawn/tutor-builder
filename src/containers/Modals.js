import * as React from "react";

// Utils.
import { getBase64FromFile } from "../utils";
import {
  URL_WEBSITE,
  URL_DASHBOARD,
  URL_DASHBOARD_CONTENT_BUILDER,
} from "../env";

// Components.
import {
  Button,
  Modal,
  Dropdown,
  CardTitle,
  ModalBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Pagination from "../components/pagination";

function Modals({
  page,
  pageMetaData,
  onDeletePage,
  onCreatePage,
  number_of_pages,
  onUpdatePageMeta,
  onContinueListener,
  onUpdateContentListener,
}) {
  // State.
  const [{ newPageModal, editPageModal, isMenuDropdownOpen }, setState] =
    React.useState({
      newPageModal: {
        isOpen: false,
        title: "",
        description: "",
        thumbnail: null,
        thumbnailSrc: "",
      },
      editPageModal: {
        isOpen: false,
        thumbnail: null,
        title: pageMetaData?.title,
        thumbnailSrc: pageMetaData?.thumbnail,
        description: pageMetaData?.description,
      },
      isMenuDropdownOpen: false,
    });

  /**
   * Listener for a change in file input fields of the two modals.
   * @param {"newPageModal" | "editPageModal"} modal
   * @param {Promise} promise
   */
  function onChangeFile(modal, file, promise) {
    // The state is set only if the image could be converted to base 64.
    promise.then((src) =>
      setState((lastState) => ({
        ...lastState,
        [modal]: {
          ...lastState[modal],
          thumbnail: file,
          thumbnailSrc: src,
        },
      }))
    );
  }

  /**
   * Listener for a change in a text field of the two modals.
   * @param {"newPageModal" | "editPageModal"} modal
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function onChangeText(modal, e) {
    const { name, value } = e.target;

    setState((lastState) => ({
      ...lastState,
      [modal]: {
        ...lastState[modal],
        [name]: value,
      },
    }));
  }

  function onToggleModal(modal) {
    setState((lastState) => ({
      ...lastState,
      [modal]: {
        ...lastState[modal],
        isOpen: !lastState[modal].isOpen,
      },
    }));
  }

  return (
    <>
      <div
        className="is-ui ui_save_content gap-2"
        style={{
          position: "fixed",
          top: "1.225rem",
          right: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => onToggleModal("newPageModal")}
          className="btn border rounded bg-light fs-5"
        >
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
        <button
          className="btn border rounded bg-light fs-5"
          onClick={() => {
            if (window.confirm("Are you sure about that?")) {
              onDeletePage(pageMetaData.id);
            }
          }}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <Button
          type="button"
          color="secondary"
          onClick={onUpdateContentListener}
        >
          Save
        </Button>
        <Button type="button" color="secondary" onClick={onContinueListener}>
          Save and Continue
        </Button>
        {/* <button type="button" onClick={() => callSaveAndFinish()} style={{"width":"120px"}}>Save On Page</button> */}
        {/* <button type="button" className="save-contenting" onClick={() => closeBuilder()} style={{"width":"85px"}}>Close</button> */}
      </div>
      {
        /* https://stackoverflow.com/questions/37949981/call-child-method-from-parent */
        // console.log("irfan data",state.mydata)
        // state.mydata?.length > 0
        //   ? state?.mydata.map((item, index) => {
        //       var text = item?.data?.html !== "" ? item?.data?.html : "";
        //       return (
        //         <>
        //           <div key={index}>{changeContent(text)}</div>
        //         </>
        //       );
        //     })
        //   : ""
      }

      {/* Add page modal. */}
      <Modal
        isOpen={newPageModal.isOpen}
        toggle={() => onToggleModal("newPageModal")}
      >
        <CardHeader className="p-3 w-100 bg-white hstack justify-content-between">
          <CardTitle>Enter properties of the new page</CardTitle>
          <button
            type="button"
            className="btn fs-5"
            onClick={() => onToggleModal("newPageModal")}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </CardHeader>
        <ModalBody>
          <form
            encType="multipart/form-data"
            onSubmit={(e) => {
              onCreatePage(e, {
                title: newPageModal.title,
                thumbnail: newPageModal.thumbnail,
                description: newPageModal.description,
                content_id: pageMetaData.content_id,
              });
              onToggleModal("newPageModal");
            }}
          >
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="control-group file-upload" id="file-upload1">
                  <label
                    htmlFor="newPageModalThumbnail"
                    className="image-box text-center cursor-pointer w-100"
                  >
                    <span
                      className="iconify tutor-iconifing"
                      data-icon="clarity:plus-line"
                    ></span>
                  </label>
                  <img
                    alt=""
                    className="d-block mt-3"
                    src={newPageModal.thumbnailSrc}
                  />
                  <div className="controls" style={{ display: "none" }}>
                    <input
                      type="file"
                      name="thumbnail"
                      id="newPageModalThumbnail"
                      onChange={(e) =>
                        onChangeFile(
                          "newPageModal",
                          e.target.files[0],
                          getBase64FromFile(e.target.files[0])
                        )
                      }
                    />
                  </div>
                </div>
                <h4 className="tutor-popup-thumbnail">
                  Thumbnail <span>*</span>
                </h4>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="form-group input-forming">
                  <input
                    required
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter A Title"
                    onChange={(e) => onChangeText("newPageModal", e)}
                  />
                </div>
                <div className="form-group input-forming">
                  <textarea
                    required
                    type="text"
                    name="description"
                    rows="4"
                    cols="50"
                    className="form-control"
                    placeholder="Enter A Short Description"
                    onChange={(e) => onChangeText("newPageModal", e)}
                  ></textarea>
                </div>
                <div className="form-group input-forming-btn">
                  <Button color="success" type="submit" className="w-100">
                    Add new page
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {/* Edit page modal. */}
      <Modal
        isOpen={editPageModal.isOpen}
        toggle={() => onToggleModal("editPageModal")}
      >
        <CardHeader className="p-3 w-100 bg-white hstack justify-content-between">
          <CardTitle>Modify the currently opened page</CardTitle>
          <button
            type="button"
            className="btn fs-5"
            onClick={() => onToggleModal("editPageModal")}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </CardHeader>
        <ModalBody>
          <form
            encType="multipart/form-data"
            onSubmit={(e) => {
              onUpdatePageMeta(e, {
                title: editPageModal.title,
                thumbnail: editPageModal.thumbnail,
                description: editPageModal.description,
                page_id: pageMetaData.id,
                content_id: pageMetaData.content_id,
              });
              onToggleModal("editPageModal");
            }}
          >
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="control-group file-upload">
                  <label
                    htmlFor="editPageModalThumbnail"
                    className="image-box text-center cursor-pointer w-100"
                  >
                    <span
                      className="iconify tutor-iconifing"
                      data-icon="clarity:plus-line"
                    ></span>
                  </label>
                  <img
                    alt=""
                    className="d-block mt-3"
                    src={editPageModal.thumbnailSrc}
                  />
                  <div className="controls" style={{ display: "none" }}>
                    <input
                      type="file"
                      name="thumbnail"
                      id="editPageModalThumbnail"
                      onChange={(e) =>
                        onChangeFile(
                          "editPageModal",
                          e.target.files[0],
                          getBase64FromFile(e.target.files[0])
                        )
                      }
                    />
                  </div>
                </div>
                <h4 className="tutor-popup-thumbnail">
                  Thumbnail <span>*</span>
                </h4>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="form-group input-forming">
                  <input
                    required
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter A Title"
                    value={editPageModal.title}
                    onChange={(e) => onChangeText("editPageModal", e)}
                  />
                </div>
                <div className="form-group input-forming">
                  <textarea
                    required
                    type="text"
                    name="description"
                    rows="4"
                    cols="50"
                    className="form-control"
                    value={editPageModal.description}
                    placeholder="Enter A Short Description"
                    onChange={(e) => onChangeText("editPageModal", e)}
                  ></textarea>
                </div>
                <div className="form-group input-forming-btn">
                  <Button color="success" type="submit" className="w-100">
                    Update the page
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <div className="back_rounds"></div>
      <nav
        style={{ zIndex: 100 }}
        className="position-fixed bottom-0 end-0 m-2 hstack gap-2"
      >
        <Pagination
          type="pages"
          itemsPerPage={1}
          currentPage={parseInt(page)}
          totalItems={parseInt(number_of_pages)}
          onChangePage={(newPage) =>
            //history.push(`/${pageMetaData.content_id}/page/${newPage}`)
            (window.location.href = `/${pageMetaData.content_id}/page/${newPage}`)
          }
        />
        {/* Settings button. */}
        <button
          type="button"
          title="Settings"
          onClick={() => onToggleModal("editPageModal")}
          className="btn border rounded bg-light fs-5"
        >
          <ion-icon name="settings-outline" />
        </button>
        {/* Home button. */}
        <Dropdown
          direction="up"
          isOpen={isMenuDropdownOpen}
          toggle={() =>
            setState((lastState) => ({
              ...lastState,
              isMenuDropdownOpen: !lastState.isMenuDropdownOpen,
            }))
          }
        >
          <DropdownToggle
            tag="button"
            title="Navigational Options"
            className="btn border rounded bg-light fs-5"
          >
            <ion-icon name="home-outline"></ion-icon>
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
        </Dropdown>
        {/* Fullscreen button. */}
        <button
          type="button"
          title="Fullscreen mode"
          className="btn border rounded bg-light fs-5"
          onClick={() =>
            document.getElementById("main_content")?.requestFullscreen()
          }
        >
          <ion-icon name="expand-outline" />
        </button>
      </nav>
    </>
  );
}

export default Modals;
