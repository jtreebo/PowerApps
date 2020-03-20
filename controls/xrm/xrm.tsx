import React, { FunctionComponent } from 'react'; 
import { createComponent, IViewComponent } from '@uifabric/foundation';


export interface IXrmProps {
  entities: string[]
}

const XrmView: IViewComponent<IXrmProps> = props => {
  const { children, entities } = props;

  if (entities.length > 0) {
    entities.forEach(function(entity) {
    fetch('https://next.json-generator.com/api/json/get/EJOeQAKHO')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log("metadata");
        window.xrm = window.xrm || {};
        window.xrm.metadata = window.xrm.metadata || {};
        window.xrm.metadata[entity] = data;
      })

    });
  }

  if (React.Children.count(children) < 1) {
    return null;
  }

  return <div>{children}</div>;
};

export const Xrm: React.FunctionComponent<{}> = createComponent(XrmView);

export default Xrm;