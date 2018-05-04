import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Chirp from './chirp';
import Chirper from './chirper';
import Post from './post';
import Details from './details';
import Edit from './edit';

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Chirp} />
                        <Route exact path="/post" component={Post} />
                        <Route exact path="/details/:id" component={Details} />
                        <Route exact path="/edit/:id" component={Edit} />
                        <Route exact path="/chirper" component={Chirper} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
