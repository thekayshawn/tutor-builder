import * as React from "react";

// Utils.
import config from "../config";
import { getAuthHeaders } from "../utils";
import { apiService, updatePage } from "../service";
import { useHistory, useParams } from "react-router-dom";
import {
  URL_USER_SERVICE,
  URL_DASHBOARD_PRICING,
  URL_DASHBOARD_CONTENT_BUILDER,
  URL_WEBSITE,
  URL_DASHBOARD,
} from "../env";

// Components.
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { Error404, Error500 } from "../components/error";
import BuilderControl from "../components/contentbuilder/buildercontrol";

/**
 * @param {Object} props
 *
 * @param {{
 * id: number,
 * content_id: number,
 * title: string,
 * description: string,
 * thumbnail: string | undefined
 * }[]} props.data
 *
 * @property {(page_id: number) => void} props.onDeletePageListener
 *
 * @returns {JSX.Element}
 */
function Editor({ data, onDeletePageListener }) {
  const { page = 1 } = useParams();
  const pageMetaData = data[page - 1];

  /**
   * A page is valid till it exceeds the number of available pages.
   */
  const isValidPage = data.length >= page && pageMetaData;

  // References.
  const history = useHistory();
  const contentBuilderRef = React.createRef();

  // State.
  const [
    { state, currentPage, newPageModal, editPageModal, isMenuDropdownOpen },
    setState,
  ] = React.useState({
    state: "loading",
    currentPage: {
      page_id: null,
      questions: [],
      html: "",
    },
    newPageModal: {
      title: "",
      description: "",
      thumbnail: null,
    },
    editPageModal: {
      title: pageMetaData.title,
      description: pageMetaData.description,
      thumbnail: pageMetaData.thumbnail,
    },
    isMenuDropdownOpen: false,
  });

  console.log({ data, isValidPage, currentPage, newPageModal, editPageModal });

  // Effects.
  React.useEffect(() => {
    if (!data.length) {
    }

    // No page to fetch data for.
    if (!isValidPage) return;

    // Request the content of the current page.
    apiService.get({
      headers: getAuthHeaders(),
      url: `${URL_USER_SERVICE}/api/learning-material/fetch-page-content/${
        data[page - 1].id
      }`,
      onSuccess: ({ data }) =>
        setState((lastState) => ({
          ...lastState,
          state: "loaded",
          currentPage: data,
        })),
      onFailure: () =>
        setState((lastState) => ({ ...lastState, state: "erred" })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);

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
      page_id: currentPage.page_id,
      html: contentBuilderRef.current.getHTML(),
    };
  }

  /**
   * Listener for the save action.
   * @returns {void}
   */
  function onSaveListener() {
    // Update.
    updatePage(getPageData());
  }

  /**
   * Listener for the save and continue action.
   * Saves the current page and redirects to the dashboard's pricing page.
   */
  function onContinueListener() {
    const pageData = getPageData();

    updatePage({
      ...pageData,
      onSuccess: (_, burger) => {
        toast.update(burger, {
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

  function onUpdateListener(e) {
    e.preventDefault();
  }

  /**
   * Listener for a change in file input fields of the two modals.
   * @param {"newPageModal" | "editPageModal"} modal
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function onChangeFile(modal, e) {
    setState((lastState) => ({
      ...lastState,
      [modal]: {
        ...lastState[modal],
        thumbnail: e.target.files[0],
      },
    }));
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

  function onCreatePage(e) {
    e.preventDefault();
  }

  return state === "erred" ? (
    <Error500 />
  ) : // An invalid page, say 5, for a valid set of data, say an array of 4 pages.
  !isValidPage && data.length > 0 ? (
    <Error404 />
  ) : state === "loading" ? (
    <Loader />
  ) : (
    <>
      <div id="overlay">
        <div className="cv-spinner">
          <span className="spinner"></span>
        </div>
      </div>
      <div className="html_showPart"></div>

      <div className="logo_tutor">
        <img src="/assets/minimalist-blocks/preview/Logo.svg" alt="logo-img" />
      </div>
      <div className="back_round"></div>
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
        <button id="add_current" className="btn border rounded bg-light fs-5">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
        <button
          id="delete_current"
          className="btn border rounded bg-light fs-5"
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <Button type="button" color="secondary" onClick={onSaveListener}>
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
              <button
                type="button"
                id="close_hide"
                className="close btn btn-danger"
                data-dismiss="modal"
                aria-hidden="true"
              >
                Cancel
              </button>
              <button
                className="btn btn-confirm"
                onClick={() => onDeletePageListener(currentPage.page_id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <BuilderControl
        history={history}
        ref={contentBuilderRef}
        onSave={onSaveListener}
        initialHtml={currentPage.html}
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
      <div
        id="tutor_add_page_modal"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog tutor-adding-page-modal">
          <div className="modal-content tutor_modal">
            <div className="modal-header tutor-modal-header">
              <div
                className="title_modal-add modal-title h4"
                id="contained-modal-title-vcenter"
              >
                Please Enter The Page Properties
              </div>
              <button
                type="button"
                id="tutor_close_page"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={onCreatePage}
                encType="multipart/form-data"
                id="tutor_add_page_modal_form"
              >
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div
                      className="control-group file-upload"
                      id="file-upload1"
                    >
                      <div className="image-box text-center cursor-pointer">
                        <span
                          className="iconify tutor-iconifing"
                          data-icon="clarity:plus-line"
                        ></span>
                        <img alt="" src="" id="image-thumbnail" />
                      </div>
                      <div className="controls" style={{ display: "none" }}>
                        <input
                          type="file"
                          name="thumbnail"
                          onChange={(e) => onChangeFile("newPageModal", e)}
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
                      <button
                        type="submit"
                        className="btn btn-Success btn-new-add"
                      >
                        Add New Page
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit page modal. */}
      <div
        id="tutor_edit_page_modal"
        className="edit-prop-model modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog tutor-adding-page-modal">
          <div className="modal-content tutor_modal">
            <div className="modal-header tutor-modal-header">
              <div
                className="title_modal-add modal-title h4"
                id="contained-modal-title-vcenter"
              >
                Modify the currently opened page.
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="tutor_closing_page"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onUpdateListener} encType="multipart/form-data">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div
                      className="control-group file-upload"
                      id="file-upload1"
                    >
                      <div className="image-box text-center cursor-pointer">
                        <span
                          className="iconify tutor-iconifing"
                          data-icon="clarity:plus-line"
                        ></span>
                        <img alt="" src="" id="image-thumbnail" />
                      </div>
                      <div className="controls" style={{ display: "none" }}>
                        <input
                          type="file"
                          name="thumbnail"
                          onChange={(e) => onChangeFile("editPageModal", e)}
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
                      <button
                        type="submit"
                        className="btn btn-Success btn-new-edit"
                      >
                        Update The Page
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="back_rounds"></div>

      {/* <Pagination
        activePage={state.currentPage}
        itemsCountPerPage={1}
        totalItemsCount={state.number_of_pages}
        pageRangeDisplayed={state.id}
        onChange={fetchThePagination.bind(this)}
        itemClass="page-item"
        linkClass="page-link"
      /> */}

      <nav
        style={{ zIndex: 100 }}
        className="position-fixed bottom-0 end-0 m-2 hstack gap-2"
      >
        {/* Settings button. */}
        <button
          type="button"
          id="edit_current"
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
