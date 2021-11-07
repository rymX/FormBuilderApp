import React, { Component, createRef } from "react";
import $ from "jquery";

import { Modal, Form, Input, Button, message } from "antd";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [];

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  
  handleOk = (values) => {
    this.setState({ isModalVisible: false });
   console.log(values);
   

   console.log("external save clicked");
   const result = this.surveyCreator.actions.save();
   console.log("result:", result);
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  clearform =()=>{
    

   console.log("external save clicked");
 this.surveyCreator.actions.clearFields();
   console.log(this.surveyCreator);

  }

  fb = createRef();

  // saveSurvey = () => {
  //   console.log("==== SAVE SURVEY ====");
  //   console.log(this.fb);
  //   console.log(this.surveyCreator);

  //   $(this.fb.current).toggle();

  // }
  componentDidMount() {
    //  $(this.fb.current).formBuilder({ formData });
    this.surveyCreator = $(this.fb.current).formBuilder({ formData });
    console.log(this.surveyCreator);
  }

  // test1 =()=>{
  //   const fbOptions = {
  //     showActionButtons: false
  //   };
  //  const fbEditor = document.getElementById('fb-editor');

  //   const formBuilder = $(fbEditor).formBuilder(fbOptions);

  //   formBuilder.actions.showData();
  // }

  // function($) {
  //   var fbEditor = document.getElementById('build-wrap');
  //   var formBuilder = $(fbEditor).formBuilder();

  //   document.getElementById('getXML').addEventListener('click', function() {
  //     alert(formBuilder.actions.getData('xml'));
  //   });
  //   document.getElementById('getJSON').addEventListener('click', function() {
  //     alert(formBuilder.actions.getData('json'));
  //   });
  //   document.getElementById('getJS').addEventListener('click', function() {
  //     alert('check console');
  //     console.log(formBuilder.actions.getData());
  //   });
  // };
  // getda() {
  //   var $fbEditor = document.getElementById('fb-editor');
  //   var formBuilder = $($fbEditor).formBuilder();

  //   document.addEventListener('fieldAdded', function(){
  //     console.log(formBuilder.formData);
  //   });
  // };
  savedata() {
    this.setState({ isModalVisible: true });
   
  }
  render() {
    return (
      <div>
        <div id="fb-editor" ref={this.fb} />

        <Button
          type="primary"
          onClick={() => {
            this.savedata();
          }}
        >
          Open Modal
        </Button>
        <Button
          type="primary"
          onClick={() => {
            this.clearform();
          }}
        >
          clear form 
        </Button>
        <Modal
          title="lets give it a name "
          visible={this.state.isModalVisible}
          footer={null}
        >
          <Form name="formCreatePage" onFinish={this.handleOk}>
            <Form.Item
              name="title"
              label="name of form "
              rules={[
                { required: true, message: "Please input the form name " },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                    Create form
                  </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
