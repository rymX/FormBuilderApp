import React, { Component, createRef } from "react";
import { Form, Input, Button, message, Tabs, Modal, Select } from "antd";
import "./home.css";
import $ from "jquery";

import axios from "axios";

const { TabPane } = Tabs;

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      forms: [],
      pages: [],
    };
  }
  fb = createRef();

  options = {
    disableFields: [
      "autocomplete",
      "header",
      "hidden",
      "textarea",
      "starRating",
    ],
    formData,
    showActionButtons: false,
  };
  componentDidMount() {
    this.surveyCreator = $(this.fb.current).formBuilder(this.options);
    console.log(this.surveyCreator);

    // get list of forms
    axios
    .get(`http://localhost:3001/form`)
    .then((response) => {
      console.log(response);
      this.setState({ forms: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
    // get list of pages
    axios
      .get(`http://localhost:3001/page`)
      .then((response) => {
        console.log(response);
        this.setState({ pages : response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onOpenModal = () => {
    const result = this.surveyCreator.actions.save();
    result.length
      ? this.setState({ isModalVisible: true })
      : message.error("empty fields");
  };
  onCloseModal = () => {
    this.setState({ isModalVisible: false });
  };
  onCreateForm = (values) => {
    const result = this.surveyCreator.actions.save();
    console.log("result:", result);

    console.log(values);
    axios
      .post("http://localhost:3001/form/", {
        inputs: result,
        title: values.title,
      })
      .then((response) => {
        message.success("form  created with success");
      })
      .catch((error) => console.log(error));

    message.success("form  created with success");
    // const fbEditor = document.getElementById("fb-editor");
    // const formBuilder = $(fbEditor).formBuilder();

    this.setState({ isModalVisible: false });
  };
  onClearFormFields = () => {
    this.surveyCreator.actions.clearFields();
  };

  onCreatePage = (values) => {
    axios
      .post("http://localhost:3001/page/", {
        title: values.title,
        description: values.description,
        link: values.link,
      })
      .then((response) => {
        message.success("page  created with success");
      })
      .catch((error) => console.log(error));
  };

  onAssignForm = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div className="form-style">
        <Tabs tabPosition="left">
          <TabPane tab="Manage forms" key="1">
            <div className="form-style">
              <div id="fb-editor" ref={this.fb} />
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "8 8px",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    this.onOpenModal();
                  }}
                >
                  Create Form
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.onClearFormFields();
                  }}
                >
                  clear form
                </Button>
              </Form.Item>

              <Modal
                title="lets give it a name "
                visible={this.state.isModalVisible}
                onCancel={this.onCloseModal}
                footer={null}
              >
                <Form name="formCreatePage" onFinish={this.onCreateForm}>
                  <Form.Item
                    name="title"
                    label="name of form "
                    rules={[
                      {
                        required: true,
                        message: "Please input the form name ",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    save form
                  </Button>
                </Form>
              </Modal>
            </div>
          </TabPane>

          {/*   ******************************manage Pages ************************************ */}

          <TabPane tab="Manage pages" key="2">
            <div>
              <Form
                name="formCreatePage"
                onFinish={this.onCreatePage}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
              >
                <h1>add a page </h1>

                <Form.Item
                  name="title"
                  label="Page title "
                  rules={[
                    { required: true, message: "Please input the page title!" },
                  ]}
                >
                  <Input placeholder="title" />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="page description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the page description!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="description" />
                </Form.Item>

                <Form.Item label="link">
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder="http://localhost:3000/page/" disabled />
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                    name="link"
                    rules={[
                      { required: true, message: "Please input the page link" },

                      {
                        pattern: /^[a-zA-Z0-9_]+$/,
                        message:
                          "link must be 26 letters of the alphabet(upper and lowercase) or Arabic number(0-9) or underscore(_) as a character",
                      },
                    ]}
                  >
                    <Input placeholder="link" />
                  </Form.Item>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
                  <Button type="primary" htmlType="submit">
                    Create Page{" "}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>

          {/*   ****************************** Assign form to page  ************************************ */}

          <TabPane tab="Assign form to page " key="3">
          <h1>Assign Form to page </h1>
          
          {this.state.pages.length || this.state.forms.length ? (<h6> il ya des form et des page </h6> ) : ( <h6> pas encore de forms et des pages  </h6>)}
           
            <Form
              name="assignRormToPage"
              onFinish={this.onAssignForm}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
            >
             

              <Form.Item
                name="form"
                label="Assign Form "
                rules={[
                  { required: true, message: "Please input the page title!" },
                ]}
              >
                <Select>
                  <Select.Option value="demo">form 1</Select.Option>
                  <Select.Option value="demo">form 2 </Select.Option>
                  <Select.Option value="demo">form 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="page"
                label="To page "
                rules={[
                  {
                    required: true,
                    message: "Please input the page description!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="demo">page 1 </Select.Option>
                  <Select.Option value="demo">page 2</Select.Option>
                  <Select.Option value="demo">page 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
                <Button type="primary" htmlType="submit">
                  Assign
                </Button>
              </Form.Item>
            </Form>

          </TabPane>
        </Tabs>
      </div>
    );
  }
}
