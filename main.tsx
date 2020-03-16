import React, { Component } from 'react';
import { DefaultPalette, Slider, Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react';
import { render } from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import {Top} from './components/Top';
import {Navigate} from './components/Left';
import Hello from './Hello';

import './style.css';


initializeIcons();

const topStyles: IStackItemStyles = {
  root: {
    height: 40,
    overflow: 'hidden'
  }
};
const navStyles: IStackItemStyles = {
  root: {
    width: 220,
    overflow: 'hidden'
  }
};
const detailStyles: IStackItemStyles = {
  root: {
    overflow: 'hidden',
    width: '100%',
    height: 'calc(100vh - 44px)',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight:20
  }
};
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };

  }
  


  render() {
    return (
      
      <Stack vertical>
        <Stack.Item>
          <Top styles={topStyles}/>
        </Stack.Item>
        <Stack horizontal>
          <Stack.Item styles={navStyles}>
            <Navigate />
          </Stack.Item>
          <Stack.Item grow styles={detailStyles}>
              <div id='detail'>
                <Hello />
            </div>
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }
}

