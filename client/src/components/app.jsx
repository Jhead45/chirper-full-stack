import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Chirp from "./chirp";
import Chirper from "./chirper";
import Post from "./post";
import Details from "./details";
import Delete from "./delete";
import Edit from "./edit";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Link to="/post">Goodbye</Link>
          <Switch>
            <Route exact path="/" component={Chirp} />
            <Route path="/post" component={Post} />
            <Route path="/delete" component={Delete} />
            <Route path="/details" component={Details} />
            <Route path="/edit" component={Edit} />
            <Route exact path="/chirper" component={Chirper} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
