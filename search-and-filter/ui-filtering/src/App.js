import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch, BrowserRouter, withRouter} from 'react-router-dom'
import filterBE from './components/filterBE';


class App extends Component {
  render() {
    return (
        <Switch>
          <Route component={filterBE} path="/" />
        </Switch>
    );
  }
}

export default withRouter(App);