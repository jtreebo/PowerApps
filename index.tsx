import React, { Component } from 'react';
import { render } from 'react-dom';
import { Main } from './main';


interface AppProps { }

interface AppState {
  name: string;
}


class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }
  


  render() {
    return (
      <Main />
    );
  }
}

render(<App />, document.getElementById('root'));
