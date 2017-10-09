import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

export default class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route exact path='/popular' component={Popular} />
            <Route render={() => <p>Not found!</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
