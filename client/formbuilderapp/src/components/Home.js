import React, { Component, createRef } from "react";
import { Form, Input, Button, message, Tabs, Modal } from "antd";
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
    };
  }
  fb = createRef();

  componentDidMount() {
    this.surveyCreator = $(this.fb.current).formBuilder({ formData });
  }
  onOpenModal = () => {
    const result = this.surveyCreator.actions.save();
    result.length ? (this.setState({ isModalVisible: true })) : (message.error("empty fields"))
   
  };
  onCloseModal =()=>{
    this.setState({isModalVisible: false })
  }
  onCreateForm = (values) => {
    const result = this.surveyCreator.actions.save();
    console.log("result:", result);

    console.log(values);
    axios
    .post("http://localhost:3001/form/", {
      inputs : result ,
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

  render() {
    return (
      <>
        <Tabs tabPosition="left">
          <TabPane tab="Manage forms" key="1">
            <div>
              <div id="fb-editor" ref={this.fb} />
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
          <TabPane tab="Manage pages" key="2">
            <div>
              <Form name="formCreatePage" onFinish={this.onCreatePage}>
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
                  <Input.TextArea />
                </Form.Item>

                <Input placeholder="http://localhost:3000/page/" disabled />

                <Form.Item
                  label="page link"
                  name="link"
                  rules={[
                    { required: true, message: "Please input the page title!" },
                  ]}
                >
                  <Input placeholder="link" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create Page{" "}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Tab 3" key="3"></TabPane>
        </Tabs>
      </>
    );
  }
}

const manageForms = function () {
  return <div> manage forms here </div>;
};
