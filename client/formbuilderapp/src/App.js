import React, { Component } from 'react';
import Home from "./components/Home";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Page from "./components/GetPageLink";
import PageNotFound from "./components/PageNotFound"
export default class App extends Component {
  constructor(props) {
      super(props);

  }
  render(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:link" element={<Page />} />
        <Route path="/PageNotFound" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
}
