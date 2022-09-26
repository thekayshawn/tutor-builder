import * as React from "react";

// Utils.
import config from "../config";
import { useHistory } from "react-router-dom";
import { getAuthHeaders, getBase64FromFile, isObjectValid } from "../utils";
import { apiService, updatePageContent } from "../service";
import {
  URL_WEBSITE,
  URL_DASHBOARD,
  URL_USER_SERVICE,
  URL_DASHBOARD_PRICING,
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
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { Error404, Error500 } from "../components/error";
import Pagination from "../components/pagination";
import BuilderControl from "../components/contentbuilder/buildercontrol";

/**
 * @param {Object} props
 *
 * @param {PageEntity[]} props.data
 *
 * @param {number} props.number_of_pages
 *
 * @property {(page: object) => void} props.onCreatePage
 *
 * @property {(page_id: number) => void} props.onDeletePage
 *
 * @property {(page: Object) => void} props.onUpdatePageMeta
 *
 * @returns {JSX.Element}
 */
function Editor({
  data,
  page,
  onDeletePage,
  onCreatePage,
  number_of_pages,
  onUpdatePageMeta,
}) {
  // There's is either a single entry or nothing at all.
  const pageMetaData = data[0];

  // References.
  const history = useHistory();
  const contentBuilderRef = React.createRef();

  // State.
  const [
    { state, pageContent, newPageModal, editPageModal, isMenuDropdownOpen },
    setState,
  ] = React.useState({
    state: "loading",
    pageContent: {
      questions: [],
      html: "",
    },
    newPageModal: {
      isOpen: false,
      title: "",
      description: "",
      thumbnail: null,
    },
    editPageModal: {
      isOpen: false,
      title: pageMetaData?.title,
      thumbnail: pageMetaData?.thumbnail,
      description: pageMetaData?.description,
    },
    isMenuDropdownOpen: false,
  });

  console.log({
    data,
    pageContent,
    pageMetaData,
    newPageModal,
    editPageModal,
  });

  // Effects.
  React.useEffect(() => {
    // No page to fetch data for.
    if (!pageMetaData) return;

    // The editPageModal needs to be updated whenever the pageMetaData changes.
    // PageMetaData changes whenever a page changes.
    setState((lastState) => ({
      ...lastState,
      editPageModal: {
        isOpen: false,
        title: pageMetaData.title,
        thumbnail: pageMetaData.thumbnail,
        description: pageMetaData.description,
      },
    }));

    // Request the content of the current page.
    apiService.get({
      headers: getAuthHeaders(),
      url: `${URL_USER_SERVICE}/api/learning-material/fetch-page-content/${pageMetaData.id}`,
      onSuccess: ({ data }) =>
        setState((lastState) => ({
          ...lastState,
          state: "loaded",
          pageContent: isObjectValid(data) ? data : pageContent,
        })),
      onFailure: () =>
        setState((lastState) => ({ ...lastState, state: "erred" })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // async function handleOnSave(html, pageNumber) {
  //   const builderHTML = contentBuilderRef.current.getHTML();
  //   var quizes = [];
  //   var quiz_questionnaire = document.querySelectorAll(".quiz-questionnaire");
  //   for (let question of quiz_questionnaire) {
  //     /*
  //     questionnaire-question-text
  //         questionnaire-multi-blank
  //         questionnaire-blank
  //         questionnaire-multi-check
  //         questionnaire-multi-choice
  //         questionnaire-option

  //     */

  //     if (
  //       question.querySelectorAll("form.questionnaire-question-text").length > 0
  //     ) {
  //       /*
  //       {
  //           "question":"The is a question",
  //           "question_type":"free_text",
  //           "explanation":"This is the explanation",
  //           "options":[]
  //       },
  //       */
  //       var ref_id = question.querySelector(
  //         "input[name=question_ref_id]"
  //       ).value; //'ref_id': ref_id,
  //       var question_title = question.querySelector("#question_num").innerText;
  //       var question_type = question.querySelector("h3").innerText;
  //       var explanation = question.querySelector(
  //         "#boolean_response_answer"
  //       ).innerText;
  //       var free_text = {
  //         ref_id: ref_id,
  //         question: question_title,
  //         question_type: question_type,
  //         explanation: explanation,
  //         options: [],
  //       };
  //       quizes.push(free_text);
  //     }
  //     if (
  //       question.querySelectorAll("form.questionnaire-multi-blank").length > 0
  //     ) {
  //       /*

  //       {
  //             "question":"The is a question",
  //             "question_type":"multi_blank",
  //             "explanation":"This is the explanation",
  //             "total_blanks":2,
  //             "options":[
  //                         {"option":"Option 1", "is_correct":0,  "blank_no":1 },
  //                         { "option":"Option 2", "is_correct":1, "blank_no":1 },
  //                         { "option":"Option 3", "is_correct":0, "blank_no":2 },
  //                         {  "option":"Option 4",  "is_correct":1, "blank_no":2 }
  //                       ]
  //         }

  //       */
  //       var ref_id = question.querySelector(
  //         "input[name=question_ref_id]"
  //       ).value; //'ref_id': ref_id,
  //       var question_title = question.querySelector("h3").innerText;
  //       var question_type = "multi_blank"; //question.querySelector('h3').innerText;
  //       var explanation = question.querySelector(
  //         "div.question.response"
  //       ).innerText;
  //       var boolean_option = [];
  //       var questionnaire_options = document.querySelectorAll(
  //         ".quiz-questionnaire form.questionnaire-multi-blank div.tutor_blank_option"
  //       );
  //       var count_div = 1;
  //       for (let opions of questionnaire_options) {
  //         var questions_inputs = opions.querySelectorAll("div.inputGrouping");
  //         for (let opts of questions_inputs) {
  //           var type = opts.querySelector("input").name;
  //           var option_value = opts.querySelector("input").value;
  //           var label = opts.querySelector("label").innerText;
  //           var is_checked = opts.querySelector(
  //             "input[name=" + type + "]"
  //           ).checked;
  //           var option_correct = is_checked ? 1 : 0;
  //           var question_boolean_option = {
  //             option: label,
  //             is_correct: option_correct,
  //             blank_no: count_div,
  //           };
  //           boolean_option.push(question_boolean_option);
  //         }
  //         count_div++;
  //       }
  //       var type_option = {
  //         ref_id: ref_id,
  //         question: question_title,
  //         question_type: question_type,
  //         explanation: explanation,
  //         options: boolean_option,
  //       };

  //       quizes.push(type_option);
  //     }
  //     if (question.querySelectorAll("form.questionnaire-blank").length > 0) {
  //       /*
  //           {
  //             "question":"The is a question",
  //             "question_type":"blank",
  //             "explanation":"This is the explanation",
  //             "options":[{  "option":"Option 1", "is_correct":0 },{ "option":"Option 2", "is_correct":1  },{  "option":"Option 3", "is_correct":0 }]
  //            }
  //       */
  //       var ref_id = question.querySelector(
  //         "input[name=question_ref_id]"
  //       ).value; //'ref_id': ref_id,
  //       var question_title = question.querySelector("h3").innerText;
  //       var question_type = "blank"; //question.querySelector('h3').innerText;
  //       var explanation = question.querySelector(
  //         "div.boolean_question_response"
  //       ).innerText;
  //       var boolean_option = [];
  //       var questionnaire_options = document.querySelectorAll(
  //         ".quiz-questionnaire form.questionnaire-blank div.inputGrouping"
  //       );
  //       for (let opions of questionnaire_options) {
  //         var type = opions.querySelector("input").name;
  //         var option_value = opions.querySelector("input").value;
  //         var label = opions.querySelector("label").innerText;
  //         var is_checked = opions.querySelector(
  //           "input[name=" + type + "]"
  //         ).checked;
  //         var option_correct = is_checked ? 1 : 0;
  //         var question_boolean_option = {
  //           option: label,
  //           is_correct: option_correct,
  //         };
  //         boolean_option.push(question_boolean_option);
  //       }
  //       var type_option = {
  //         ref_id: ref_id,
  //         question: question_title,
  //         question_type: question_type,
  //         explanation: explanation,
  //         options: boolean_option,
  //       };

  //       quizes.push(type_option);
  //     }
  //     if (
  //       question.querySelectorAll("form.questionnaire-multi-check").length > 0
  //     ) {
  //       /*
  //           {
  //               "question":"The is a question",
  //               "question_type":"multi_answer",
  //               "explanation":"This is the explanation",
  //               "options":[{"option":"Option 1", "is_correct":1 },{ "option":"Option 2", "is_correct":1},{ "option":"Option 3", "is_correct":0}]
  //           },
  //       */
  //       var ref_id = question.querySelector(
  //         "input[name=question_ref_id]"
  //       ).value; //'ref_id': ref_id,
  //       var question_title = question.querySelector("h3").innerText;
  //       var question_type = "multi_answer"; //question.querySelector('h3').innerText;
  //       var explanation = question.querySelector(
  //         "div.check_question_response"
  //       ).innerText;
  //       var boolean_option = [];
  //       var questionnaire_options = document.querySelectorAll(
  //         ".quiz-questionnaire form.questionnaire-multi-check div.inputGrouping"
  //       );
  //       for (let opions of questionnaire_options) {
  //         var type = opions.querySelector("input").name;
  //         var option_value = opions.querySelector("input").value;
  //         var label = opions.querySelector("label").innerText;
  //         var is_checked = opions.querySelector(
  //           "input[name=" + type + "]"
  //         ).checked;
  //         var option_correct = is_checked ? 1 : 0;
  //         var question_boolean_option = {
  //           option: label,
  //           is_correct: option_correct,
  //         };
  //         boolean_option.push(question_boolean_option);
  //       }
  //       var type_option = {
  //         ref_id: ref_id,
  //         question: question_title,
  //         question_type: question_type,
  //         explanation: explanation,
  //         options: boolean_option,
  //       };

  //       quizes.push(type_option);
  //     }
  //     if (
  //       question.querySelectorAll("form.questionnaire-multi-choice").length > 0
  //     ) {
  //       /*
  //           {
  //               "question":"The is a question",
  //               "question_type":"multi_select",
  //               "explanation":"This is the explanation",
  //               "options":[{"option":"Option 1", "is_correct":0 },{ "option":"Option 2", "is_correct":1},{ "option":"Option 3", "is_correct":0}]
  //           },
  //       */
  //       var ref_id = question.querySelector(
  //         "input[name=question_ref_id]"
  //       ).value; //'ref_id': ref_id,
  //       var question_title = question.querySelector("h3").innerText;
  //       var question_type = "multi_select"; //uestion.querySelector('h3').innerText;
  //       var explanation = question.querySelector(
  //         "div.check_question_response"
  //       ).innerText;
  //       var boolean_option = [];
  //       var questionnaire_options = document.querySelectorAll(
  //         ".quiz-questionnaire form.questionnaire-multi-choice div.inputGrouping"
  //       );
  //       for (let opions of questionnaire_options) {
  //         var type = opions.querySelector("input").name;
  //         var option_value = opions.querySelector("input").value;
  //         var label = opions.querySelector("label").innerText;
  //         var is_checked = opions.querySelector(
  //           "input[name=" + type + "]"
  //         ).checked;
  //         var option_correct = is_checked ? 1 : 0;
  //         var question_boolean_option = {
  //           option: label,
  //           is_correct: option_correct,
  //         };
  //         boolean_option.push(question_boolean_option);
  //       }
  //       var type_option = {
  //         ref_id: ref_id,
  //         question: question_title,
  //         question_type: question_type,
  //         explanation: explanation,
  //         options: boolean_option,
  //       };

  //       quizes.push(type_option);
  //     }
  //     if (question.querySelectorAll("form.questionnaire-option").length > 0) {
  //       /*
  //           {
  //               "question":"The is a question",
  //               "question_type":"yes/no",
  //               "explanation":"This is the explanation",
  //               "options":[{"option":"Option 1", "is_correct":0 },{ "option":"Option 2", "is_correct":1}]
  //           },
  //       */
  //       var ref_id = question.querySelector(
  //         "input[name=question_ref_id]"
  //       ).value; //'ref_id': ref_id,
  //       var question_title = question.querySelector("h3").innerText;
  //       var question_type = "yes/no"; //question.querySelector('h3').innerText;
  //       var explanation = question.querySelector(
  //         "#boolean_response_answer"
  //       ).innerText;
  //       var boolean_option = [];
  //       var questionnaire_options = document.querySelectorAll(
  //         ".quiz-questionnaire form.questionnaire-option div.inputGrouping"
  //       );
  //       for (let opions of questionnaire_options) {
  //         var type = opions.querySelector("input").name;
  //         var option_value = opions.querySelector("input").value;
  //         var label = opions.querySelector("label").innerText;
  //         var is_checked = opions.querySelector(
  //           "input[name=" + type + "]"
  //         ).checked;
  //         var option_correct = is_checked ? 1 : 0;
  //         var question_boolean_option = {
  //           option: label,
  //           is_correct: option_correct,
  //         };
  //         boolean_option.push(question_boolean_option);
  //       }
  //       var type_option = {
  //         ref_id: ref_id,
  //         question: question_title,
  //         question_type: question_type,
  //         explanation: explanation,
  //         options: boolean_option,
  //       };

  //       quizes.push(type_option);
  //     }
  //   }

  //   html = html.replace("its-answer", "its-org");
  //   html = html.replace("multiple_bbolean", "multiple_bboolean");
  //   html = html.replace("multi_box_answer", "multis_boxes_answers");
  //   // html = html.replace("mcqs-answer-single", "mcqing-answers-single");
  //   html = html.replaceAll("mcqs-answer", "multi_mcqting_answer");

  //   html = html.replaceAll(
  //     'data-editable="false"',
  //     'data-editable="false" contenteditable="false"'
  //   );
  //   html = html.replaceAll(
  //     'data-editable="true"',
  //     'data-editable="true" contenteditable="true"'
  //   );

  //   var page_id = 1;
  //   if (state.learning_material.length > 0) {
  //     if (state.learning_material[0].length > 0) {
  //       page_id = state.learning_material[0][0].id;
  //     } else {
  //       page_id = state.learning_material[0].id;
  //     }
  //   }
  //   console.log("check data", state.mydata);
  //   let id = state.mydata.length > 0 ? state.mydata[0]?.data?._id : "";
  //   let has_form = html.includes("<form");

  //   const pathName = window.location.pathname;
  //   const lm_id = pathName.split("/", 2);
  //   var content_id = lm_id[1];
  //   // var content_id = props.match.params.id;

  //   //Add Quiz

  //   if (has_form) {
  //     const myJSONquizes = JSON.stringify(quizes);
  //     const params = new URLSearchParams();
  //     params.append("content_id", content_id);
  //     params.append("page_id", page_id);
  //     params.append("questions", myJSONquizes);
  //     const config = {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     };
  //     var error = "";
  //     const resp = await axios
  //       .post(`${api_host}/learning-material-quiz/create-quiz`, params, config)
  //       .catch((err) => (error = err.response.data.message));
  //     fetchThePagination(state.number_of_pages + 1);

  //     if (resp && resp.status === 200) {
  //     } else {
  //       toast.error(error, {
  //         position: "bottom-right",
  //       });
  //       return;
  //     }
  //   }

  //   //Add Quiz
  //   console.log("idddddddd", id);
  //   if (id == "" || id == null) {
  //     const params = new URLSearchParams();
  //     params.append("content_id", content_id);
  //     params.append("page_id", page_id);
  //     params.append("html", builderHTML);
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     };
  //     //.catch(err => console.log(err))
  //     const resp = await axios.post(
  //       `${api_host}/learning-material/create/`,
  //       params,
  //       config
  //     );

  //     setState({
  //       html: builderHTML,
  //       loading: true,
  //       content_id: content_id,
  //       page_id: page_id,
  //       mydata: resp.data,
  //     });
  //     if (resp.status === 200) {
  //       toast.success("Saved Successfull!", { position: "bottom-right" });
  //       setState({
  //         ...state,
  //         loading: false,
  //       });
  //       // window.location.replace("http://localhost:3001/auth/tutor-dashboard/content-builder");
  //     }
  //   } else {
  //     const params = new URLSearchParams();
  //     params.append("page_id", page_id);
  //     params.append("html", builderHTML);
  //     const config = {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     };
  //     const resp = await axios.post(
  //       `${api_host}/learning-material/update/`,
  //       params,
  //       config
  //     );
  //     setState({
  //       html: builderHTML,
  //       loading: true,
  //       content_id: content_id,
  //       page_id: page_id,
  //       mydata: resp.data[0],
  //     });

  //     if (resp.status === 200) {
  //       toast.success("Saved Successfull!", { position: "bottom-right" });
  //     }
  //   }
  // }

  // Listeners.
  function getPageData() {
    if (!contentBuilderRef.current) {
      toast.error("There was an error, please try again!");
      return;
    }

    // Update.
    return {
      page_id: pageMetaData.id,
      html: contentBuilderRef.current.getHTML(),
    };
  }

  /**
   * Listener for the save action.
   * @returns {void}
   */
  function onUpdateContentListener() {
    // Update.
    updatePageContent(getPageData());
  }

  /**
   * Listener for the save and continue action.
   * Saves the current page and redirects to the dashboard's pricing page.
   */
  function onContinueListener() {
    const pageData = getPageData();

    // Save and continue.
    updatePageContent({
      ...pageData,
      onSuccess: (_, burger) => {
        toast.update(burger, {
          autoClose: true,
          isLoading: false,
          type: toast.TYPE.INFO,
          render: "Saved, redirecting to dashboard...",
        });

        setTimeout(() => {
          window.location.replace(
            `${URL_DASHBOARD_PRICING}/${pageMetaData.content_id}`
          );
        }, config.duration.REDIRECTION);
      },
    });
  }

  /**
   * Listener for a change in file input fields of the two modals.
   * @param {"newPageModal" | "editPageModal"} modal
   * @param {Promise} promise
   */
  function onChangeFile(modal, promise) {
    // The state is set only if the image could be converted to base 64.
    promise.then((src) =>
      setState((lastState) => ({
        ...lastState,
        [modal]: {
          ...lastState[modal],
          thumbnail: src,
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

  return state === "erred" ? (
    <Error500 />
  ) : // An invalid page, say 5, for a valid set of data, say an array of 4 pages. Note that a page is valid when it's metadata isn't found while the actual list of pages fundamentally exists. If the list isn't there, a new page is created in a side-effect handler above.
  !pageMetaData && data.length > 0 ? (
    <Error404 />
  ) : state === "loading" ? (
    <Loader />
  ) : (
    <>
      {/* The huge margin above the actual content builder. */}
      <div className="html_showPart"></div>
      {/* The header's logo. */}
      <div className="logo_tutor">
        <img src="/assets/minimalist-blocks/preview/Logo.svg" alt="logo-img" />
      </div>
      {/* The header's background. */}
      <div className="back_round"></div>
      {/* The header. */}
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
          id="delete_current"
          className="btn border rounded bg-light fs-5"
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
      {/* Delete page modal. */}
      <div
        id="confirmModal"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog confirm_dialog">
          <div className="modal-content confirm-content">
            <div className="modal-body">
              <h3>Confirm!</h3>
              <h5>Are you sure you want to delete this page?</h5>
            </div>
            <div className="modal-footer">
              <Button type="button" color="success" id="close_hide">
                No, cancel
              </Button>
              <Button
                color="danger"
                onClick={() => onDeletePage(pageMetaData.id)}
              >
                Yes, delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BuilderControl
        history={history}
        ref={contentBuilderRef}
        onSave={onUpdateContentListener}
        initialHtml={pageContent.html}
        //doSave={(f) => (callSave = f)}
        //doDestroy={(f) => (callDestroy = f)}
        base64Handler={"/upload"}
        largerImageHandler={"/upload"}
        imageSelect={"images.html"}
        snippetFile={"/assets/minimalist-blocks/content.js"}
        languageFile={"/contentbuilder/lang/en.js"}
      />
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
                ...newPageModal,
                page_id: pageMetaData.id,
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
                    src={newPageModal.thumbnail}
                  />
                  <div className="controls" style={{ display: "none" }}>
                    <input
                      type="file"
                      name="thumbnail"
                      id="newPageModalThumbnail"
                      onChange={(e) =>
                        onChangeFile(
                          "newPageModal",
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
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter A Title"
                    onChange={(e) => onChangeText("newPageModal", e)}
                  />
                </div>
                <div className="form-group input-forming">
                  <textarea
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
                ...editPageModal,
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
                    src={editPageModal.thumbnail}
                  />
                  <div className="controls" style={{ display: "none" }}>
                    <input
                      type="file"
                      name="thumbnail"
                      id="editPageModalThumbnail"
                      onChange={(e) =>
                        onChangeFile(
                          "editPageModal",
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
            history.push(`/${pageMetaData.content_id}/page/${newPage}`)
          }
        />
        {/* Settings button. */}
        <button
          type="button"
          onClick={() => onToggleModal("editPageModal")}
          className="btn border rounded bg-light fs-5"
        >
          <ion-icon name="settings-outline"></ion-icon>
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
          className="btn border rounded bg-light fs-5"
          onClick={() =>
            document.getElementById("main_content")?.requestFullscreen()
          }
        >
          <ion-icon name="expand-outline"></ion-icon>
        </button>
        {/* <nav className="empower">
          <ul>
            <li className="menu" id="dropMenu">
              <div
                className="drop-box"
                data-backdrop="static"
                data-keyboard="false"
              >
                <a className="drop-text" href="#">
                  <img
                    src="/assets/minimalist-blocks/preview/icon/power_normal.svg"
                    alt="full-icon"
                  />
                </a>
              </div>
              <ul id="tutor_ul" className="setting_empower">
              <li className="home">
                <div className="arrow"></div>
                <a href="#">
                  <div className="blue-box"></div>
                  Setting</a>
              </li>
              <li className="setting-01">
                <a href="#">
                  <div className="blue-box"></div>
                  Setting 01</a>
              </li>
              <li className="setting-02">
                <a href="#">
                  <div className="blue-box"></div>
                  Setting 02</a>
              </li>
              <li className="creator">
                <a href="#">
                  <div className="blue-box"></div>
                  Creator Type</a>
              </li>
              <li className="settings">
                <a href="#" className="change_individual" title="minimal" id="pre-minimal" data-value="power" value="Power">
                  <div className="blue-box"></div>
                  Power</a>
              </li>
              <li className="messages">
                <a href="#" className="change_individual" id="default" data-value="normal" value="Normal">
                  <div className="blue-box"></div>
                  Normal</a></li>
            </ul>
            </li>
          </ul>
        </nav> */}
        {/* <nav className="tutor_current_page">
          <ul>
            <li className="menu" id="dropMenu">
              <div
                className="drop-boxies"
                data-backdrop="static"
                data-keyboard="false"
              >
                <a className="drop-texties" href="#">
                  <img
                    src="/assets/minimalist-blocks/preview/icon/text.svg"
                    alt="full-icon"
                  />
                </a>
              </div>
              <ul id="ulies" className="settingies_empoweries">
                {student_HTMLTABLE}
              </ul>
            </li>
          </ul>
        </nav> */}
      </nav>
    </>
  );
}

export default Editor;
