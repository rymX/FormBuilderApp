import React from 'react';
import { useForm } from 'react-hook-form';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
var items = [{
  key: 'Header',
  name: 'Header Text',
  icon: 'fa fa-header',
  static: true,
  content: 'Placeholder Text...'
},
{
  key: 'Paragraph',
  name: 'Paragraph',
  static: true,
  icon: 'fa fa-paragraph',
  content: 'Placeholder Text...'
}];
export default function App() {
 
  
  return (
    <ReactFormBuilder  
    form_action="/path/to/form/submit"
    form_method="POST"
    task_id={12} // Used to submit a hidden variable with the id to the form from the database.
    // answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
    //authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
    // data={JSON_QUESTION_DATA} // Question data
    />
  );
}