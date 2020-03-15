import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Toolbar } from './toolbar';
import { ContextualMenuItem, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenuItem';


const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px'
});

export interface IDetailsListBasicExampleItem {
  _id: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
}

export class DetailsListBasicExample extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);
this.onButtonClick = this.onButtonClick.bind(this);
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this._columns = [
      { key: 'company', name: 'Company', fieldName: 'company', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'email', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'phone', name: 'Phone', fieldName: 'phone', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'address', name: 'Address', fieldName: 'address', minWidth: 100, maxWidth: 200, isResizable: true }
    ];

    this.state = {
      items: [],
      selectionDetails: this._getSelectionDetails()
    };
  }

  componentDidMount() {
    console.log("mount");
    this.getData();
  }

  private getData() {
    fetch('https://next.json-generator.com/api/json/get/NkeswSIHO')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState({ items: data });
      })
  };

  private onButtonClick(key: string) {
    alert(key);
  };

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <Fabric>
      <Toolbar onButtonClick={this.onButtonClick} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
      </Fabric>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).company;
      default:
        return '${selectionCount} items selected';
    }
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.company.toLowerCase().indexOf(text) > -1) : this._allItems
    });
  };

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Item invoked: ${item.company}`);
  };
}
