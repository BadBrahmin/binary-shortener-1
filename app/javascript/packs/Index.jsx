import React from "react";
import { render } from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.body.appendChild(document.createElement("div")));
});
