import React, { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import Page from "./Page";

export default function GetPageLink() {
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/page/link/${params.link}`)
      .then()
      .catch(() => {
        navigate("/PageNotFound");
      });
  });
  return (
    <div>
      <Page link={params.link} />
    </div>
  );
}
