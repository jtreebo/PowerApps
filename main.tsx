import React, { Component } from 'react';
import { render } from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import {Top} from './components/Top';
import {Navigate} from './components/Left';
import Hello from './Hello';

import './style.css';


initializeIcons();


export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };

  }
  


  render() {
    return (
      
      <div class="row">
      <Top />
      
        <div class="nav">
          <Navigate />
        </div>
        <div class="detail" id='detail'>
          <Hello />
        </div>
      </div>
    );
  }
}

