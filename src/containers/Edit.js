import React, { Component } from "react";

// Components.
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ToastContainer, toast } from "react-toastify";
import BuilderControl from "../components/contentbuilder/buildercontrol";

// Utils.
import qs from "qs";
import $ from "jquery";
import axios from "axios";
import { apiService } from "../service";
import { getAuthHeaders } from "../utils";
import { URL_DASHBOARD_PRICING } from "../config";
import { URL_DASHBOARD_CONTENT_BUILDER, URL_USER_SERVICE } from "../env";

// Static.
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentMeta: {
        data: [],
        state: "loading",
      },
      html: "new page",
      visible: false,
      title: "",
      description: "",
      selectedFile: "",

      title_edit: "",
      description_edit: "",
      selectedFile_edit: "",

      currentPage: 1,
      currentsPage: 0,
      number_of_pages: 1,
      default: 0,
      creates: [],
      learning_material: [],
      showData: [],
      content_id: "",
      page_id: "",
      questions: [],
      correct_answer: "",
      activePage: 15,
      question: "",
      totalUsers: 0,
      pagtes: "",
      id: "",
      loading: false,
      mydata: [],
      contectData: [],
      page_id: 0,
      page_meta_title: "",
      newpage_done: "",
    };
    this.history = props.history;
    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeUpdate = this.handleInputChangeUpdate.bind(this);
    /*this.handleOnSaveAndFinish = this.handleOnSaveAndFinish.bind(this);  */
    this.contentBuilderRef = React.createRef();
  }

  handleInputChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }
  handleInputChangeUpdate(event) {
    this.setState({ selectedFile_edit: event.target.files[0] });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  fullScreenPage = () => {
    var el = document.getElementById("main_content");
    el?.requestFullscreen();
  };

  handleOnSave = async (html, pageNumber) => {
    console.log("check handleOnSave page when new page create");
    const builderHTML = this.contentBuilderRef.current.getHTML();
    var quizes = [];
    var quiz_questionnaire = document.querySelectorAll(".quiz-questionnaire");
    for (let question of quiz_questionnaire) {
      /*
      questionnaire-question-text
          questionnaire-multi-blank
          questionnaire-blank
          questionnaire-multi-check
          questionnaire-multi-choice
          questionnaire-option
                     
      */

      if (
        question.querySelectorAll("form.questionnaire-question-text").length > 0
      ) {
        /*
        {
            "question":"The is a question",
            "question_type":"free_text",
            "explanation":"This is the explanation",
            "options":[]
        },   
        */
        var ref_id = question.querySelector(
          "input[name=question_ref_id]"
        ).value; //'ref_id': ref_id,
        var question_title = question.querySelector("#question_num").innerText;
        var question_type = question.querySelector("h3").innerText;
        var explanation = question.querySelector(
          "#boolean_response_answer"
        ).innerText;
        var free_text = {
          ref_id: ref_id,
          question: question_title,
          question_type: question_type,
          explanation: explanation,
          options: [],
        };
        quizes.push(free_text);
      }
      if (
        question.querySelectorAll("form.questionnaire-multi-blank").length > 0
      ) {
        /*
        
        {
              "question":"The is a question",
              "question_type":"multi_blank",
              "explanation":"This is the explanation",
              "total_blanks":2,
              "options":[
                          {"option":"Option 1", "is_correct":0,  "blank_no":1 },
                          { "option":"Option 2", "is_correct":1, "blank_no":1 },
                          { "option":"Option 3", "is_correct":0, "blank_no":2 },
                          {  "option":"Option 4",  "is_correct":1, "blank_no":2 }
                        ]
          }
        
        */
        var ref_id = question.querySelector(
          "input[name=question_ref_id]"
        ).value; //'ref_id': ref_id,
        var question_title = question.querySelector("h3").innerText;
        var question_type = "multi_blank"; //question.querySelector('h3').innerText;
        var explanation = question.querySelector(
          "div.question.response"
        ).innerText;
        var boolean_option = [];
        var questionnaire_options = document.querySelectorAll(
          ".quiz-questionnaire form.questionnaire-multi-blank div.tutor_blank_option"
        );
        var count_div = 1;
        for (let opions of questionnaire_options) {
          var questions_inputs = opions.querySelectorAll("div.inputGrouping");
          for (let opts of questions_inputs) {
            var type = opts.querySelector("input").name;
            var option_value = opts.querySelector("input").value;
            var label = opts.querySelector("label").innerText;
            var is_checked = opts.querySelector(
              "input[name=" + type + "]"
            ).checked;
            var option_correct = is_checked ? 1 : 0;
            var question_boolean_option = {
              option: label,
              is_correct: option_correct,
              blank_no: count_div,
            };
            boolean_option.push(question_boolean_option);
          }
          count_div++;
        }
        var type_option = {
          ref_id: ref_id,
          question: question_title,
          question_type: question_type,
          explanation: explanation,
          options: boolean_option,
        };

        quizes.push(type_option);
      }
      if (question.querySelectorAll("form.questionnaire-blank").length > 0) {
        /*
            {
              "question":"The is a question",
              "question_type":"blank",
              "explanation":"This is the explanation",
              "options":[{  "option":"Option 1", "is_correct":0 },{ "option":"Option 2", "is_correct":1  },{  "option":"Option 3", "is_correct":0 }]
             }
        */
        var ref_id = question.querySelector(
          "input[name=question_ref_id]"
        ).value; //'ref_id': ref_id,
        var question_title = question.querySelector("h3").innerText;
        var question_type = "blank"; //question.querySelector('h3').innerText;
        var explanation = question.querySelector(
          "div.boolean_question_response"
        ).innerText;
        var boolean_option = [];
        var questionnaire_options = document.querySelectorAll(
          ".quiz-questionnaire form.questionnaire-blank div.inputGrouping"
        );
        for (let opions of questionnaire_options) {
          var type = opions.querySelector("input").name;
          var option_value = opions.querySelector("input").value;
          var label = opions.querySelector("label").innerText;
          var is_checked = opions.querySelector(
            "input[name=" + type + "]"
          ).checked;
          var option_correct = is_checked ? 1 : 0;
          var question_boolean_option = {
            option: label,
            is_correct: option_correct,
          };
          boolean_option.push(question_boolean_option);
        }
        var type_option = {
          ref_id: ref_id,
          question: question_title,
          question_type: question_type,
          explanation: explanation,
          options: boolean_option,
        };

        quizes.push(type_option);
      }
      if (
        question.querySelectorAll("form.questionnaire-multi-check").length > 0
      ) {
        /*
            {
                "question":"The is a question",
                "question_type":"multi_answer",
                "explanation":"This is the explanation",
                "options":[{"option":"Option 1", "is_correct":1 },{ "option":"Option 2", "is_correct":1},{ "option":"Option 3", "is_correct":0}]
            },
        */
        var ref_id = question.querySelector(
          "input[name=question_ref_id]"
        ).value; //'ref_id': ref_id,
        var question_title = question.querySelector("h3").innerText;
        var question_type = "multi_answer"; //question.querySelector('h3').innerText;
        var explanation = question.querySelector(
          "div.check_question_response"
        ).innerText;
        var boolean_option = [];
        var questionnaire_options = document.querySelectorAll(
          ".quiz-questionnaire form.questionnaire-multi-check div.inputGrouping"
        );
        for (let opions of questionnaire_options) {
          var type = opions.querySelector("input").name;
          var option_value = opions.querySelector("input").value;
          var label = opions.querySelector("label").innerText;
          var is_checked = opions.querySelector(
            "input[name=" + type + "]"
          ).checked;
          var option_correct = is_checked ? 1 : 0;
          var question_boolean_option = {
            option: label,
            is_correct: option_correct,
          };
          boolean_option.push(question_boolean_option);
        }
        var type_option = {
          ref_id: ref_id,
          question: question_title,
          question_type: question_type,
          explanation: explanation,
          options: boolean_option,
        };

        quizes.push(type_option);
      }
      if (
        question.querySelectorAll("form.questionnaire-multi-choice").length > 0
      ) {
        /*
            {
                "question":"The is a question",
                "question_type":"multi_select",
                "explanation":"This is the explanation",
                "options":[{"option":"Option 1", "is_correct":0 },{ "option":"Option 2", "is_correct":1},{ "option":"Option 3", "is_correct":0}]
            },
        */
        var ref_id = question.querySelector(
          "input[name=question_ref_id]"
        ).value; //'ref_id': ref_id,
        var question_title = question.querySelector("h3").innerText;
        var question_type = "multi_select"; //uestion.querySelector('h3').innerText;
        var explanation = question.querySelector(
          "div.check_question_response"
        ).innerText;
        var boolean_option = [];
        var questionnaire_options = document.querySelectorAll(
          ".quiz-questionnaire form.questionnaire-multi-choice div.inputGrouping"
        );
        for (let opions of questionnaire_options) {
          var type = opions.querySelector("input").name;
          var option_value = opions.querySelector("input").value;
          var label = opions.querySelector("label").innerText;
          var is_checked = opions.querySelector(
            "input[name=" + type + "]"
          ).checked;
          var option_correct = is_checked ? 1 : 0;
          var question_boolean_option = {
            option: label,
            is_correct: option_correct,
          };
          boolean_option.push(question_boolean_option);
        }
        var type_option = {
          ref_id: ref_id,
          question: question_title,
          question_type: question_type,
          explanation: explanation,
          options: boolean_option,
        };

        quizes.push(type_option);
      }
      if (question.querySelectorAll("form.questionnaire-option").length > 0) {
        /*
            {
                "question":"The is a question",
                "question_type":"yes/no",
                "explanation":"This is the explanation",
                "options":[{"option":"Option 1", "is_correct":0 },{ "option":"Option 2", "is_correct":1}]
            },
        */
        var ref_id = question.querySelector(
          "input[name=question_ref_id]"
        ).value; //'ref_id': ref_id,
        var question_title = question.querySelector("h3").innerText;
        var question_type = "yes/no"; //question.querySelector('h3').innerText;
        var explanation = question.querySelector(
          "#boolean_response_answer"
        ).innerText;
        var boolean_option = [];
        var questionnaire_options = document.querySelectorAll(
          ".quiz-questionnaire form.questionnaire-option div.inputGrouping"
        );
        for (let opions of questionnaire_options) {
          var type = opions.querySelector("input").name;
          var option_value = opions.querySelector("input").value;
          var label = opions.querySelector("label").innerText;
          var is_checked = opions.querySelector(
            "input[name=" + type + "]"
          ).checked;
          var option_correct = is_checked ? 1 : 0;
          var question_boolean_option = {
            option: label,
            is_correct: option_correct,
          };
          boolean_option.push(question_boolean_option);
        }
        var type_option = {
          ref_id: ref_id,
          question: question_title,
          question_type: question_type,
          explanation: explanation,
          options: boolean_option,
        };

        quizes.push(type_option);
      }
    }

    html = html.replace("its-answer", "its-org");
    html = html.replace("multiple_bbolean", "multiple_bboolean");
    html = html.replace("multi_box_answer", "multis_boxes_answers");
    // html = html.replace("mcqs-answer-single", "mcqing-answers-single");
    html = html.replaceAll("mcqs-answer", "multi_mcqting_answer");

    html = html.replaceAll(
      'data-editable="false"',
      'data-editable="false" contenteditable="false"'
    );
    html = html.replaceAll(
      'data-editable="true"',
      'data-editable="true" contenteditable="true"'
    );

    var page_id = 1;
    if (this.state.learning_material.length > 0) {
      if (this.state.learning_material[0].length > 0) {
        page_id = this.state.learning_material[0][0].id;
      } else {
        page_id = this.state.learning_material[0].id;
      }
    }
    console.log("check data", this.state.mydata);
    let id =
      this.state.mydata.length > 0 ? this.state.mydata[0]?.data?._id : "";
    let has_form = html.includes("<form");

    const pathName = window.location.pathname;
    const lm_id = pathName.split("/", 2);
    var content_id = lm_id[1];
    // var content_id = this.props.match.params.id;

    //Add Quiz

    if (has_form) {
      const myJSONquizes = JSON.stringify(quizes);
      const params = new URLSearchParams();
      params.append("content_id", content_id);
      params.append("page_id", page_id);
      params.append("questions", myJSONquizes);
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      var error = "";
      const resp = await axios
        .post(
          `${URL_USER_SERVICE}/learning-material-quiz/create-quiz`,
          params,
          config
        )
        .catch((err) => (error = err.response.data.message));
      this.fetchThePagination(this.state.number_of_pages + 1);

      if (resp && resp.status === 200) {
      } else {
        toast.error(error, {
          position: "bottom-right",
        });
        return;
      }
    }

    //Add Quiz
    console.log("idddddddd", id);
    if (id == "" || id == null) {
      const params = new URLSearchParams();
      params.append("content_id", content_id);
      params.append("page_id", page_id);
      params.append("html", builderHTML);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      //.catch(err => console.log(err))
      const resp = await axios.post(
        `${URL_USER_SERVICE}/learning-material/create/`,
        params,
        config
      );

      this.setState({
        html: builderHTML,
        loading: true,
        content_id: content_id,
        page_id: page_id,
        mydata: resp.data,
      });
      if (resp.status === 200) {
        toast.success("Saved Successfull!", { position: "bottom-right" });
        this.setState({
          ...this.state,
          loading: false,
        });
        // window.location.replace("http://localhost:3001/auth/tutor-dashboard/content-builder");
      }
    } else {
      const params = new URLSearchParams();
      params.append("page_id", page_id);
      params.append("html", builderHTML);
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      const resp = await axios.post(
        `${URL_USER_SERVICE}/learning-material/update/`,
        params,
        config
      );
      this.setState({
        html: builderHTML,
        loading: true,
        content_id: content_id,
        page_id: page_id,
        mydata: resp.data[0],
      });

      if (resp.status === 200) {
        toast.success("Saved Successfull!", { position: "bottom-right" });
      }
    }
  };

  componentWillUnmount() {
    if (this.callDestroy) this.callDestroy();
  }

  async componentDidMount() {
    //Fetch Pages Start
    //   console.log("page",this.state.number_of_pages);
    //   console.log("content_id",this.state.newpage_done);
    // if(localStorage.getItem('first')!='created'){
    //   console.log("create page first");
    //   this.addFirstpage();
    // }

    const user = JSON.parse(localStorage.getItem("user"));
    const contentId = window.location.pathname.split("/")[1];

    // Request the metadata for the current set of learning materials.
    apiService.get({
      headers: getAuthHeaders(user.access_token),
      url: `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${contentId}?order=ASC`,
      onSuccess: ({ data }) =>
        this.setState({
          ...this.state,
          contentMeta: { data, state: "loaded" },
        }),
      onFailure: (error) =>
        this.setState({
          ...this.state,
          contentMeta: { state: "erred" },
        }),
    });

    const pathName = window.location.pathname;
    const lm_id = pathName.split("/", 2);
    var id1 = lm_id[1];
    const authAxios = axios.create({
      headers: {
        "X-Auth-Token": `${user.access_token}`,
      },
    });
    /// var id1 = this.props.match.params.id;
    // let url = `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id1}?order=ASC`;
    // console.log(url);
    // const result1 = await authAxios.get(url);
    // console.log(result1);
    // if (result1.data.status == false) {
    //   this.addFirstpage();
    //   let url = `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id1}?order=ASC`;
    //   console.log("iffff", url);
    //   const result1 = await authAxios.get(url);
    //   var response = result1.data.data;
    //   console.log("response-runing page iffff", response);
    //   this.setState({
    //     learning_material: [response],
    //     page_meta_title: response[0].title,
    //     title_edit: response[0].title,
    //     description_edit: response[0].description,
    //     selectedFile_edit: response[0].thumbnail,
    //   });
    // } else {
    //   let url = `${URL_USER_SERVICE}/contentbuilder/learning-material/fetch-pages/${id1}?order=ASC`;
    //   console.log("else", url);
    //   const result1 = await authAxios.get(url);
    //   var response = result1.data.data;
    //   this.setState({
    //     learning_material: [response],
    //     page_meta_title: response[0].title,
    //     title_edit: response[0].title,
    //     description_edit: response[0].description,
    //     selectedFile_edit: response[0].thumbnail,
    //   });
    // }
    //   //Fetch Pages Ends
    var id_content = this.state.learning_material[0][0].id;
    console.log("testing done", id_content);
    const myresp = await axios.get(
      `${URL_USER_SERVICE}/learning-material/fetch-page-content/${id_content}`
    );
    //     .catch(err => console.log(err));

    var myrespdata = myresp?.data ? [myresp.data] : [];
    console.log("runing page myrespdata", myrespdata);
    var content_Id = lm_id[1];
    //var content_Id = this.props.match.params.id;
    if (myrespdata.length < 1) {
      myrespdata = [{ _id: "", content_id: content_Id, html: "", page_id: "" }];
      this.setState({ mydata: myrespdata, contectData: myrespdata });
    }
    var currentPage = this.state.currentPage;
    console.log("page current_1", currentPage);
    const result = await authAxios.get(
      `${URL_USER_SERVICE}/tutor/learning-material/fetch?order=ASC`
    );
    const data = result.data.data;
    this.setState({
      creates: data,
      learning_material: data,
      showData: result.data,
      isLoading: false,
      content_id: content_Id,
      currentPage: currentPage,
    });

    var page_id = this.state.learning_material[0].id;
    const myresponse = await authAxios
      .get(`${URL_USER_SERVICE}/learning-material/fetch-page-detail/${page_id}`)
      .catch((err) => "");
    var responsed = myresponse.data.data;
    this.setState({
      learning_material: responsed,
      page_id: page_id,
      title: data[0].title,
      description: data[0].description,
    });
    console.log("content_page_2", this.state.currentPage);
    this.fetchThePagination(this.state.currentPage);
  }

  paginationPageContent = async (pageNumber) => {
    //   //Fetch Pages Start
    let user = JSON.parse(localStorage.getItem("user"));
    const authAxios = axios.create({
      headers: { "X-Auth-Token": `${user.access_token}` },
    });

    const pathName = window.location.pathname;
    const lm_id = pathName.split("/", 2);
    var id1 = lm_id[1];

    //  // var id1 = this.props.match.params.id; /// not use
    let url = `${URL_USER_SERVICE}/learning-material/fetch-pages/${id1}?order=ASC`;
    const result1 = await authAxios.get(url);
    let response = result1.data.data;

    this.setState({
      page_meta_title: response[pageNumber].title,
      title_edit: response[pageNumber].title,
      description_edit: response[pageNumber].description,
      selectedFile_edit: response[pageNumber]?.thumbnail,
    });

    let id_content = response[pageNumber].id;
    // let id_content = lm_id[1];
    console.log("contentid", id_content);
    const myresp = await axios.get(
      `${URL_USER_SERVICE}/learning-material/fetch-page-content/${id_content}`
    );

    let myrespdata = myresp?.data ? [myresp.data] : [];
    console.log("page content details", myrespdata);
    //// checking completed//////
    let content_Id_One = lm_id[1];

    if (myrespdata.length < 1) {
      myrespdata = [
        { _id: "", content_id: content_Id_One, html: "", page_id: "" },
      ];
    }

    this.setState({ mydata: myrespdata, contectData: myrespdata });

    var currentPage = this.state.currentPage;

    const result = await authAxios.get(
      `${URL_USER_SERVICE}/tutor/learning-material/fetch`
    );
    ////checkec code done
    var number_of_pages = this.state.number_of_pages;
    var currentPage = this.state.currentPage;

    var id = lm_id[1];

    // var id = this.props.match.params.id;
    const data = result.data.data;

    this.setState({
      /* creates:data, learning_material:data,*/
      number_of_pages: number_of_pages,
      showData: result.data,
      isLoading: false,
      content_id: id,
      currentPage: currentPage,
    });
    //  this.fetchThePagination(this.state.currentPage);
    ///return;
  };

  fetchThePagination = async (pageNumber) => {
    // // const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
    let user = JSON.parse(localStorage.getItem("user"));
    const authAxios = axios.create({
      headers: { "X-Auth-Token": `${user.access_token}` },
    });
    console.log("contentid", this.state.content_id);
    let url = `${URL_USER_SERVICE}/learning-material/fetch-pages/${this.state.content_id}?page=${pageNumber}&limit=1&order=ASC`;

    const resp = await authAxios.get(url);
    let data = resp.data.data;
    console.log("mydata", data);
    // const id = this.props.match?.params?.id; //// not use

    const number_of_pages = resp.data.number_of_pages
      ? resp.data.number_of_pages
      : this.state.number_of_pages;
    console.log("this my pages", number_of_pages);
    this.setState({
      learning_material: data,
      number_of_pages: number_of_pages,
      currentPage: pageNumber,
      title_edit: data[0]?.title,
      description_edit: data[0]?.description,
      selectedFile_edit: data[0]?.thumbnail,
    });

    this.paginationPageContent(pageNumber - 1);
  };

  closeBuilder = () => {
    const answer = window.confirm("Do you really want to leave?");
    if (!answer) return false;
    this.props.history.push("/");
  };

  openModal() {
    this.setState({ visible: true });
  }
  closeModal() {
    this.setState({ visible: false });
  }
  changeContent = (html) => {
    if (html == "undefined" || this.state.html == html) return;
    this.setState({ html: html });
  };

  handlesInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlesInputUpdate = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  addFirstpage = async () => {
    console.log("add page is runing");
    const pathName = window.location.pathname;
    const lm_id = pathName.split("/", 3);
    const title = lm_id[2];
    const description_demo = "no description";
    const formData = new FormData();
    formData.append("content_id", lm_id[1]);
    formData.append("title", title);
    formData.append("description", description_demo);
    formData.append("thumbnail", "");
    let user = JSON.parse(localStorage.getItem("user"));
    const authAxios = axios.create({
      headers: { "X-Auth-Token": `${user.access_token}` },
    });
    const res = await authAxios.post(
      `${URL_USER_SERVICE}/learning-material/add-page`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("page added response", res);
    if (res.status == 200) {
      localStorage.setItem("first", "created");

      console.log("ohhh page is created");
      this.setState({
        page_meta_title: title,
        number_of_pages: 1,
        currentPage: 1,
      });
      toast.success("Page Added Successfull!", {
        position: "bottom-right",
      });
    }
  };

  tutorCreate = async (e) => {
    e.preventDefault();
    if (
      this.state.title == "" ||
      this.state.description == "" ||
      this.state.selectedFile == "" ||
      this.state.selectedFile === null
    ) {
      toast.error("Please fill all fields.", { position: "bottom-right" });
      return;
    }

    const pathName = window.location.pathname;
    const lm_id = pathName.split("/", 2);
    const formData = new FormData();
    formData.append("content_id", lm_id[1]);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append(
      "thumbnail",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    let user = JSON.parse(localStorage.getItem("user"));
    const authAxios = axios.create({
      headers: { "X-Auth-Token": `${user.access_token}` },
    });
    const res = await authAxios.post(
      `${URL_USER_SERVICE}/learning-material/add-page`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 200) {
      $("#tutor_add_page_modal button.close").trigger("click");
      this.closeModal();
      let pages = this.state.number_of_pages + 1;
      this.setState({
        number_of_pages: pages,
        page_meta_title: this.state.title,
      });
      toast.success("Page Added Successfull!", {
        position: "bottom-right",
      });
      document.getElementById("tutor_add_page_modal_form").reset();
      $("#image-thumbnail").attr("src", "");
    } else if (res.status === 400) {
      toast.warning("wrong email or password!", { position: "bottom-right" });
    } else {
      this.setState({ errorList: res.data.errorsList });
      toast.error("Please Fill The All Field", {
        position: "bottom-right",
      });
    }
  };

  pageDelete = async () => {
    console.log("delete page now ");
    var contet_id = this.state.content_id;
    if (this.state.currentPage == 1) {
      toast.error("This page can't be Delete!", {
        position: "bottom-right",
      });
    } else {
      var pageId = this.state.learning_material[0].id;
      const updatedTasks = this.state.learning_material.find(
        (page) => pageId === page.id
      );
      this.setState({ currentpage: updatedTasks });
      let user = JSON.parse(localStorage.getItem("user"));
      const authAxios = axios.create({
        headers: {
          "X-Auth-Token": `${user.access_token}`,
        },
      });

      await authAxios
        .delete(`${URL_USER_SERVICE}/learning-material/delete-page/${pageId}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          data: qs.stringify({ page_id: pageId }),
        })
        .then((res) => {
          if (res.status === 200) {
            let pages = this.state.number_of_pages - 1;
            this.paginationPageContent(0);
            this.setState({
              number_of_pages: pages,
              currentPage: 1,
            });
            toast.success("Delete The Successfull!", {
              position: "bottom-right",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  editPageContent = async () => {
    if (
      this.state.title_edit == "" ||
      this.state.description_edit == "" ||
      this.state.selectedFile_edit == "" ||
      this.state.selectedFile_edit === null
    ) {
      toast.error("Please fill all fields.", { position: "bottom-right" });

      return false;
    }
    var pageId = this.state.learning_material[0].id;
    const updatedTasks = this.state.learning_material.find(
      (page) => pageId === page.id
    );
    this.setState({ currentpage: updatedTasks });
    const formData = new FormData();
    formData.append("content_id", this.state.content_id);
    formData.append("title", this.state.title_edit);
    formData.append("description", this.state.description_edit);

    if (this.state.selectedFile_edit.name) {
      formData.append(
        "thumbnail",
        this.state.selectedFile_edit,
        this.state.selectedFile_edit.name
      );
    }

    formData.append("page_id", pageId);
    let user = JSON.parse(localStorage.getItem("user"));
    const authAxios = axios.create({
      headers: {
        "X-Auth-Token": `${user.access_token}`,
      },
    });

    await authAxios
      .post(`${URL_USER_SERVICE}/learning-material/update-page`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          $(".edit-prop-model button.close").trigger("click");
          this.setState({
            page_meta_title: this.state.title_edit,
            title_edit: this.state.title_edit,
            description_edit: this.state.description_edit,
          });
          toast.success("Update The Page Successfull!", {
            position: "bottom-right",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  saveAndContinue() {
    localStorage.removeItem("first");
    this.callSave();
    setTimeout(() => {
      window.location.replace(
        `${URL_DASHBOARD_PRICING}/${localStorage.getItem("planId")}`
      );
      localStorage.removeItem("planId");
    }, 3000);
  }

  render() {
    //let pageData = this.state.learning_material.find( (page) => page.id == this.state.page_id );
    var student_HTMLTABLE = "";
    student_HTMLTABLE =
      this.state.learning_material.length > 0
        ? this.state.learning_material?.map((item, index) => {
            return (
              <>
                <li
                  key={index}
                  className="home setting-01"
                  style={{
                    width: "250px",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "2px",
                  }}
                >
                  <span style={{ marginLeft: "5px" }}>
                    {this.state.currentPage}
                  </span>

                  <span style={{ marginLeft: "5px" }}>
                    {" "}
                    {this.state.page_meta_title}
                  </span>
                  {/* <HiOutlinePencil id="edit_current" className="tutor-page-edit"/> */}
                  <img
                    id="edit_current"
                    className="tutor-page-edit"
                    src="../assets/minimalist-blocks/preview/pencil-edit.svg"
                    alt="edit-img"
                  />
                </li>
                {/* <li key={index} className="setting-01"><Link to="#"><div className="blue-box"></div>{item.title}</Link></li>  */}
                {/*                 <li><h5 id="edit_current" className="tutor-page-edit"><img src="../assets/minimalist-blocks/preview/edit-pencil.svg" alt="edit-img"/></h5></li>  */}
              </>
            );
          })
        : "";

    return (
      <>
        <div id="overlay">
          <div className="cv-spinner">
            <span className="spinner"></span>
          </div>
        </div>
        <div className="html_showPart"></div>

        <div className="logo_tutor">
          <img
            src="../assets/minimalist-blocks/preview/Logo.svg"
            alt="logo-img"
          />
        </div>
        <div className="back_round"></div>
        <div
          className="is-ui ui_save_content"
          style={{
            position: "fixed",
            top: "20px",
            right: "35px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img
            src="../assets/minimalist-blocks/preview/icon/add_page.svg"
            id="add_current"
            className="tutor-content-modal"
          />
          <img
            src="../assets/minimalist-blocks/preview/icon/delete_page.svg"
            className="add-contenting"
            id="delete_current"
          />
          <button
            type="button"
            className="save-contenting"
            onClick={() => this.callSave()}
          >
            Save
          </button>
          <button
            type="button"
            className="save-contenting"
            onClick={() => this.saveAndContinue()}
          >
            Save and Continue
          </button>
          {/* <button type="button" onClick={() => this.callSaveAndFinish()} style={{"width":"120px"}}>Save On Page</button> */}
          {/* <button type="button" className="save-contenting" onClick={() => this.closeBuilder()} style={{"width":"85px"}}>Close</button> */}
        </div>

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
                <h1>Confirm !</h1>
                <h2>Are You Sure Delete Page</h2>
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
                  onClick={() => this.pageDelete()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <BuilderControl
          ref={this.contentBuilderRef}
          history={this.history}
          initialHtml={this.state.html}
          onSave={this.handleOnSave}
          doSave={(f) => (this.callSave = f)}
          doDestroy={(f) => (this.callDestroy = f)}
          base64Handler={"/upload"}
          largerImageHandler={"/upload"}
          imageSelect={"images.html"}
          snippetFile={"/assets/minimalist-blocks/content.js"}
          languageFile={"/contentbuilder/lang/en.js"}
        />
        {
          /* https://stackoverflow.com/questions/37949981/call-child-method-from-parent */

          // console.log("irfan data",this.state.mydata)
          this.state.mydata?.length > 0
            ? this.state?.mydata.map((item, index) => {
                var text = item?.data?.html !== "" ? item?.data?.html : "";
                return (
                  <>
                    <div key={index}>{this.changeContent(text)}</div>
                  </>
                );
              })
            : ""
        }

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
                  onSubmit={this.tutorCreate}
                  encType="multipart/form-data"
                  id="tutor_add_page_modal_form"
                >
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <div
                        className="control-group file-upload"
                        id="file-upload1"
                      >
                        <div className="image-box text-center">
                          <span
                            className="iconify tutor-iconifing"
                            data-icon="clarity:plus-line"
                          ></span>
                          <img src="" id="image-thumbnail" />
                        </div>
                        <div className="controls" style={{ display: "none" }}>
                          <input
                            type="file"
                            name="thumbnail"
                            onChange={this.handleInputChange}
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
                          onChange={this.handlesInput}
                          className="form-control"
                          placeholder="Enter A Title"
                        />
                      </div>
                      <div className="form-group input-forming">
                        <textarea
                          type="text"
                          name="description"
                          rows="4"
                          cols="50"
                          onChange={this.handlesInput}
                          className="form-control"
                          placeholder="Enter A Short Description"
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
                  Please Edit The Page Properties
                </div>
                <button
                  type="button"
                  id="tutor_closing_page"
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form encType="multipart/form-data">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <div
                        className="control-group file-upload"
                        id="file-upload1"
                      >
                        <div className="image-box text-center">
                          <span
                            className="iconify tutor-iconifing"
                            data-icon="clarity:plus-line"
                          ></span>

                          <img
                            src={
                              this.state.selectedFile_edit
                                ? this.state.selectedFile_edit
                                : ""
                            }
                            alt="img-tutor"
                            className={
                              this.state.selectedFile_edit
                                ? "page-thumb"
                                : "page-no-thumb"
                            }
                          />
                        </div>
                        <div className="controls" style={{ display: "none" }}>
                          <input
                            type="file"
                            name="selectedFile_edit"
                            onChange={this.handleInputChangeUpdate}
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
                          name="title_edit"
                          value={this.state.title_edit}
                          onChange={this.handlesInputUpdate}
                          className="form-control"
                          placeholder="Enter A Title"
                        />
                      </div>
                      <div className="form-group input-forming">
                        <textarea
                          type="text"
                          name="description_edit"
                          value={this.state.description_edit}
                          rows="4"
                          cols="50"
                          onChange={this.handlesInputUpdate}
                          className="form-control"
                          placeholder="Enter A Short Description"
                        ></textarea>
                      </div>
                      <div className="form-group input-forming-btn">
                        <button
                          type="button"
                          className="btn btn-Success btn-new-edit"
                          onClick={() => this.editPageContent()}
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

        <Pagination
          activePage={this.state.currentPage}
          itemsCountPerPage={1}
          totalItemsCount={this.state.number_of_pages}
          pageRangeDisplayed={this.state.id}
          onChange={this.fetchThePagination.bind(this)}
          itemClass="page-item"
          linkClass="page-link"
        />

        {/* <div class="zoom-tool-bar"></div> */}

        <div className="tutor-menu-content">
          <img
            className="screen_element"
            onClick={this.fullScreenPage}
            src="../assets/minimalist-blocks/preview/icon/full_screen.svg"
            alt="full-icon"
          />

          <nav className="empowers">
            <ul>
              <li className="menu" id="dropMenu">
                <div
                  className="drop-boxes"
                  data-backdrop="static"
                  data-keyboard="false"
                >
                  <a className="drop-textes" href="#">
                    <img
                      src="../assets/minimalist-blocks/preview/icon/house.svg"
                      alt="full-icon"
                    />
                  </a>
                </div>
                <ul id="uly" className="settings_empowers">
                  <li className="home">
                    <div className="arrow"></div>
                    <Link to="/">
                      <div className="blue-box"></div>
                      Home
                    </Link>
                  </li>
                  <li className="setting-01">
                    <Link
                      onClick={() => {
                        window.location.replace(URL_DASHBOARD_CONTENT_BUILDER);
                      }}
                    >
                      <div className="blue-box"></div>
                      Dashboard
                    </Link>
                  </li>
                  <li className="setting-02">
                    <a href="#">
                      <div className="blue-box"></div>
                      Help
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <nav className="empower">
            <ul>
              <li className="menu" id="dropMenu">
                <div
                  className="drop-box"
                  data-backdrop="static"
                  data-keyboard="false"
                >
                  <a className="drop-text" href="#">
                    <img
                      src="../assets/minimalist-blocks/preview/icon/power_normal.svg"
                      alt="full-icon"
                    />
                  </a>
                </div>
                {/* <ul id="tutor_ul" className="setting_empower">
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
              </ul> */}
              </li>
            </ul>
          </nav>
          <nav className="tutor_current_page">
            <ul>
              <li className="menu" id="dropMenu">
                <div
                  className="drop-boxies"
                  data-backdrop="static"
                  data-keyboard="false"
                >
                  <a className="drop-texties" href="#">
                    <img
                      src="../assets/minimalist-blocks/preview/icon/text.svg"
                      alt="full-icon"
                    />
                  </a>
                </div>
                <ul id="ulies" className="settingies_empoweries">
                  {student_HTMLTABLE}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <ToastContainer />
      </>
    );
  }
}
