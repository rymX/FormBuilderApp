import axios from "axios";
import React, { Component, createRef } from "react";
import { Button } from "antd";
import "./page.css";

import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDetails: [],
      options: {
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
        dataType: "xml",
        formData:
'<form-template xmlns="http://www.w3.org/1999/xhtml"><fields><field type="text" required="false" label="Text Field" class-name="form-control" name="text-1636389785418-0" access="false" subtype="text"></field><field type="text" required="false" label="Text Field" class-name="form-control" name="text-1636389788949-0" access="false" subtype="text"></field><field type="date" required="false" label="Date Field" class-name="form-control" name="date-1636389793781-0" access="false"></field><field type="checkbox-group" required="false" label="Checkbox Group" toggle="false" inline="false" name="checkbox-group-1636389803230-0" access="false" other="false"><option label="Option 1" value="option-1" selected="true">Option 1</option></field><field type="button" label="Button" subtype="button" class-name="btn-default btn" name="button-1636389807390-0" access="false" style="default"></field></fields></form-template>',
        showActionButtons: false,
      },
      formDetails: [],
    };
  }

  fb = createRef();
  getPageFormFields = (formId) => {
    axios
      .get(`http://localhost:3001/form/id/${formId}`)
      .then((response) => {
        console.log(response.data[0].inputs[0]);
        this.setState({ formDetails: response.data[0] });

        const newOptions = {
          dataType: "xml",
          formData: response.data[0].inputs[0],
        };
        this.setState({ options: newOptions });

      })
      .catch((error) => {
        console.log(error);
      });
  };
  getPagedetail = (link) => {
    axios
      .get(`http://localhost:3001/page/link/${link}`)
      .then((response) => {
        console.log(response.data[0]);
        this.setState({ pageDetails: response.data });
        this.getPageFormFields(response.data[0].form);
      })
      .catch((error) => {});
  };

  componentDidMount() {
    //this.getPagedetail(this.props.link);
console.log(this.props.params);
    this.surveyCreator = $(this.fb.current).formBuilder(this.state.options);
  }

  //
  onSendEntries() {
    const result = this.surveyCreator.actions.getData();
    const values = result.map((obj) => {
      return [obj.label, obj.value];
    });
    // axios . post values + id form + id page
  }
  render() {
    return (
      <div className="page">
        {this.state.pageDetails.length ? (
          <div>
            {" "}
            <h1> {this.state.pageDetails[0].title} </h1>{" "}
            <h3> {this.state.pageDetails[0].description} </h3>
          </div>
        ) : (
          <h6></h6>
        )}

        {this.state.options ? (
          <div>
            <h2> {this.state.formDetails.title} </h2>
            <form>
              <div id="fb-editor" ref={this.fb} />
            </form>
            <Button
              type="primary"
              onClick={() => {
                this.onSendFields();
              }}
            >
              submit Entries
            </Button>
          </div>
        ) : (
          <h5> </h5>
        )}
      </div>
    );
  }
}
