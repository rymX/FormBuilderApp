import React, { Component, createRef } from "react";
import { Form, Input, Button, message, Tabs, Modal, Select } from "antd";
import "./home.css";

import $ from "jquery"; // Load jquery

import axios from "axios";

const { TabPane } = Tabs;

window.jQuery = $; // jquery alias 
window.$ = $; // jquery alias 

require("jquery-ui-sortable"); // formbuilder drag and drop
require("formBuilder"); // formbuilder



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
      showActionButtons: false,
    dataType: 'xml' 
  };
  componentDidMount() {
    this.surveyCreator = $(this.fb.current).formBuilder(this.options);

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
        this.setState({ pages: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onOpenModal = () => {
    const result = this.surveyCreator.actions.getData('xml');
    result == '<form-template xmlns="http://www.w3.org/1999/xhtml"><fields></fields></form-template>' ? (message.error("empty fields")): (this.setState({ isModalVisible: true }));  
  };

  onCloseModal = () => {
    this.setState({ isModalVisible: false });
  };
  
  onCreateForm = (values) => {
    const result = this.surveyCreator.actions.getData('xml');
    console.log(values);
    axios
      .post("http://localhost:3001/form/", {
        inputs: result,
        title: values.title,
      })
      .then((response) => {
        message.success("form  created with success");
      })
      .catch((error) =>{});

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
      .catch((error) =>{
        if (error.response.data.message === "link_unavailable") {
          message.error("this link is already taken ");
        }
      });
  };

  onAssignForm = (values) => {
    
    const pageid = values.page
    const formid = values.form
    axios.patch(`http://localhost:3001/page/`, { pageid , formid })
      .then((response) => {
        message.success('assign done')
      })
      .catch();

      axios.patch(`http://localhost:3001/form/`, { pageid , formid })
      .then()
      .catch();
  };

  render() {
    return (
      <div className="form-style">
        <Tabs tabPosition="left">


 {/*   ******************************manage forms ************************************ */}

          <TabPane tab="Manage forms" key="1">
            <div className="form-style">
              <div id="fb-editor" ref={this.fb} />
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    this.onOpenModal();
                  }}
                >
                  Create Form
                </Button>
                </Form.Item>
                <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    this.onClearFormFields();
                  }}
                >
                  Clear form
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
                <h1>Create a page </h1>

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

            {this.state.pages.length || this.state.forms.length ? (
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
                    {this.state.forms.map((form) => {
                      return (
                        <Select.Option value={form._id}>
                          {" "}
                          {form.title}{" "}
                        </Select.Option>
                      );
                    })}
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
                    {this.state.pages.map((page) => {
                      return (
                        <Select.Option value={page._id}>
                          {" "}
                          {page.title}{" "}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
                  <Button type="primary" htmlType="submit">
                    Assign
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <h6> no forms and pages yet </h6>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
