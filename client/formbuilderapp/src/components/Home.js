import React, { Component, createRef } from "react";
import { Form, Input, Button, message } from "antd";
import $ from "jquery";

import { Tabs } from "antd";
import axios from "axios";
// const ManageForms = require("./ManageForms");
// const ManagePages = require("./ManagePages");

const { TabPane } = Tabs;

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "formBuilder in React",
  },
  {
    type: "paragraph",
    label: "This is a demonstration of formBuilder running in a React project.",
  },
];

export default class Home extends Component {
  fb = createRef();

  componentDidMount() {
    $(this.fb.current).formBuilder({ formData });
  }

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
    console.log(this.fb);
    return (
      <>
        <Tabs tabPosition="left">
          <TabPane tab="Manage forms" key="1">
            <div id="fb-editor" ref={this.fb} />
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
