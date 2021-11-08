import axios from "axios";
import React, { Component, createRef } from "react";
import { Form, Input, Button, message, Tabs, Modal } from "antd";

import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
// require("formBuilder/dist/form-render.min.js");

const formData = [];
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData :[]
    };
  }

  fb = createRef();
  getPageFormFields=(formId)=>{
    axios
      .get(`http://localhost:3001/form/id/${formId}`)
      .then((response) => {
        console.log(response.data[0].inputs);
       this.setState({ formData: response.data[0].inputs });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getPagedetail = (link) => {
    axios.get(`http://localhost:3001/page/link/${link}`)
        .then((response) => {
          console.log(response.data)
           this.setState({data : response.data[0]})
           this.getPageFormFields(response.data[0].form)
        })
        .catch((error) => {
        })
    // axios
    //   .get(`http://localhost:3001/form/id/6187d844100d3652d56b3fb2`)
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({ data: response.data[0] });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  options = {
    disableFields: [
      "autocomplete",
      "button",
      "checkbox-group",
      "date",
      "file",
      "header",
      "hidden",
      "number",
      "paragraph",
      "radio-group",
      "select",
      "starRating",
      "text",
      "paragraph",
      "textarea",
    ],
    formData,
    showActionButtons: false,
    disabledFieldButtons: {
      button: ["remove", "edit", "copy"],
      date: ["remove", "edit", "copy"],
      file: ["remove", "edit", "copy"],
      number: ["remove", "edit", "copy"],
      paragraph: ["remove", "edit", "copy"],
      text: ["remove", "edit", "copy"],
    },
  };

  componentDidMount() {
    this.getPagedetail(this.props.link)
    const data = this.state.formData
    this.surveyCreator = $(this.fb.current).formBuilder({data});
    console.log(this.surveyCreator);

  }
  onSendFields() {
    const result = this.surveyCreator.actions.getData();
   const values = result.map(obj =>{return [obj.label , obj.value] })
   console.log(values); 
   // axios . post values + id form + id page 
  }
  render() {
    return (
      
      <div>
        { this.state.formData.length ? ( <div>  <form>
          <div id="fb-editor" ref={this.fb} />
        </form>
        <Button
          type="primary"
          onClick={() => {
            this.onSendFields();
          }}
        >
          Create Form
        </Button> </div> ): ( <h6> there is no form assign to this page yet </h6>  )}
       

      </div>
    );
  }
}
