import * as React from "react";

// Utils.
import { integers } from "../config";
import { useHistory } from "react-router-dom";
import { getAuthHeaders, isObjectValid } from "../utils";
import { apiService, updatePageContent } from "../service";
import { URL_USER_SERVICE, URL_DASHBOARD_PRICING } from "../env";

// Components.
import Modals from "./Modals";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { Error404, Error500 } from "../components/error";
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
  const history = useHistory();

  // References.
  const contentBuilderRef = React.createRef();

  // There's either a single entry or nothing at all.
  const pageMetaData = data[0];

  // State.
  const [{ state, pageContent }, setState] = React.useState({
    state: "loading",
    pageContent: {
      questions: [],
      html: "",
    },
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
        thumbnail: null,
        title: pageMetaData?.title,
        thumbnailSrc: pageMetaData?.thumbnail,
        description: pageMetaData?.description,
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
          // The pageContent is reset if none is found.
          pageContent: isObjectValid(data) ? data : { questions: [], html: "" },
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
      content_id: pageMetaData.content_id,
      html: contentBuilderRef.current.getHTML(),
    };
  }

  /**
   * Listener for the save action.
   *
   * @param {Function | undefined} onSuccess
   *
   * @returns {void}
   */
  function onUpdateContentListener(onSuccess = () => {}) {
    console.log({ onSuccess });

    // Update.
    updatePageContent({ ...getPageData(), onSuccess });
  }

  /**
   * Listener for the save and continue action.
   * Saves the current page and redirects to the dashboard's pricing page.
   */
  function onContinueListener() {
    onUpdateContentListener((_, burger) => {
      toast.update(burger, {
        isLoading: false,
        type: toast.TYPE.INFO,
        autoClose: integers.REDIRECTION,
        render: "Saved, redirecting to dashboard...",
      });

      setTimeout(() => {
        window.location.replace(
          `${URL_DASHBOARD_PRICING}/${pageMetaData.content_id}`
        );
      }, integers.REDIRECTION);
    });
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
      <BuilderControl
        history={history}
        ref={contentBuilderRef}
        initialHtml={pageContent.html}
        onSave={onUpdateContentListener}
        //doSave={(f) => (callSave = f)}
        //doDestroy={(f) => (callDestroy = f)}
        base64Handler="/upload"
        imageSelect="images.html"
        largerImageHandler="/upload"
        languageFile="/contentbuilder/lang/en.js"
        snippetFile="/assets/minimalist-blocks/content.js"
      />
      <Modals
        {...{
          page,
          pageMetaData,
          onDeletePage,
          onCreatePage,
          number_of_pages,
          onUpdatePageMeta,
          onContinueListener,
          onUpdateContentListener,
        }}
      />
    </>
  );
}

export default Editor;
