import React, { Component } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import About from './components/About';
import Navigator from './components/Navigator';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route path="/About/" component={About} />
              <Route path="/CustomerList/" component={CustomerList} />
              <Route path="/TrainingList/" component={TrainingList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
