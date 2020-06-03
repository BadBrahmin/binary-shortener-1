import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import LinkList from "../components/links/LinkList";
import CategoryList from "../components/categories/CategoryList";
import Reports from "../components/reports/Reports";

export default (
  <Router>
    <Header />
    <div className="text-center container mb-6">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/category" component={CategoryList} />
        <Route exact path="/reports" component={Reports} />
      </Switch>
    </div>
  </Router>
);
