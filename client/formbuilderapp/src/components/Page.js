import axios from "axios";
import React, { Component, createRef } from "react";
import { Form, Input, Button, message, Tabs, Modal } from "antd";

import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
// require("formBuilder/dist/form-render.min.js");

const formData = [
  {
    type: "autocomplete",
    required: false,
    label: "Autocomplete",
    className: "form-control",
    name: "autocomplete-1636294774172-0",
    access: false,
    requireValidOption: false,
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
      {
        label: "Option 2",
        value: "option-2",
        selected: false,
      },
      {
        label: "Option 3",
        value: "option-3",
        selected: false,
      },
    ],
  },
  {
    type: "button",
    label: "Button",
    subtype: "button",
    className: "btn-default btn",
    name: "button-1636294775544-0",
    access: false,
    style: "default",
  },
  {
    type: "checkbox-group",
    required: false,
    label: "Checkbox Group",
    toggle: false,
    inline: false,
    name: "checkbox-group-1636294783386-0",
    access: false,
    other: false,
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
    ],
  },
  {
    type: "date",
    required: false,
    label: "Date Field",
    className: "form-control",
    name: "date-1636294784287-0",
    access: false,
  },
  {
    type: "file",
    required: false,
    label: "File Upload",
    className: "form-control",
    name: "file-1636294784996-0",
    access: false,
    subtype: "file",
    multiple: false,
  },
  {
    type: "header",
    subtype: "h1",
    label: "Header",
    access: false,
  },
  {
    type: "hidden",
    name: "hidden-1636294786874-0",
    access: false,
  },
  {
    type: "number",
    required: false,
    label: "Number",
    className: "form-control",
    name: "number-1636294787562-0",
    access: false,
  },
  {
    type: "paragraph",
    subtype: "p",
    label: "Paragraph",
    access: false,
  },
  {
    type: "radio-group",
    required: false,
    label: "Radio Group",
    inline: false,
    name: "radio-group-1636294789136-0",
    access: false,
    other: false,
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: false,
      },
      {
        label: "Option 2",
        value: "option-2",
        selected: false,
      },
      {
        label: "Option 3",
        value: "option-3",
        selected: false,
      },
    ],
  },
  {
    type: "select",
    required: false,
    label: "Select",
    className: "form-control",
    name: "select-1636294790848-0",
    access: false,
    multiple: false,
    values: [
      {
        label: "Option 1",
        value: "option-1",
        selected: true,
      },
      {
        label: "Option 2",
        value: "option-2",
        selected: false,
      },
      {
        label: "Option 3",
        value: "option-3",
        selected: false,
      },
    ],
  },
  {
    type: "text",
    required: false,
    label: "Text Field",
    className: "form-control",
    name: "text-1636294792309-0",
    access: false,
    subtype: "text",
  },
  {
    type: "textarea",
    required: false,
    label: "Text Area",
    className: "form-control",
    name: "textarea-1636294794075-0",
    access: false,
    subtype: "textarea",
  },
];
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fb = createRef();
  getPagedetail = (link) => {
    // axios.get(`http://localhost:3001/page/link/${link}`)
    //     .then((response) => {
    //        this.setState({data : response.data[0]})

    //     })
    //     .catch((error) => {

    //     })
    axios
      .get(`http://localhost:3001/form/id/6187d844100d3652d56b3fb2`)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
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
    this.surveyCreator = $(this.fb.current).formBuilder(this.options);
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
        <form>
          <div id="fb-editor" ref={this.fb} />
        </form>
        <Button
          type="primary"
          onClick={() => {
            this.onSendFields();
          }}
        >
          Create Form
        </Button>
      </div>
    );
  }
}
