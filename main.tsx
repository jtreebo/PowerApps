import React, { Component } from 'react';
import { render } from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import {Navigate} from './components/Left';
import {Person} from './forms/person';
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
      <div class="nav">
      <Navigate />
      </div>
      <div class="detail" id='detail'>
      
<Person />
      </div>
      
      </div>
      
    );
  }
}

