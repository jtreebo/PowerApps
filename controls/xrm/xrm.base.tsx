import * as React from 'react';
import { initializeComponentRef } from '@uifabric/utilities';

export interface IXrmDropdownInternalProps {
  entities: string[]
}

export interface IXrmDropdownState  {
  
}

export class XrmBase extends React.Component<IXrmDropdownInternalProps, IXrmDropdownState>  {
   
  constructor(props: IXrmDropdownInternalProps) {
    super(props);

    this.state =  {
      
    };
    
  }

  componentWillMount() {
    
  }

  

  public render(): JSX.Element {
    
    const props = this.props;
    const {
      entities
    } = props;

    return (
      <div />
    );
  }
}