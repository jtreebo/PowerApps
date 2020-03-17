import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList,
  DetailsListLayoutMode,
  IDetailsHeaderProps,
  Selection,
  IColumn,
  ConstrainMode,
  IDetailsFooterProps,
  DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Toolbar } from './toolbar';
import  { DialogBlockingExample } from './edit';
import { ContextualMenuItem, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenuItem';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px'
});

const _footerItem: IScrollablePaneDetailsListExampleItem = {
  key: 'footer',
  test1: 'Footer 1',
  test2: 'Footer 2',
  test3: 'Footer 3',
  test4: 'Footer 4',
  test5: 'Footer 5',
  test6: 'Footer 6'
};

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative'
  },
  filter: {
    paddingBottom: 20,
    maxWidth: 300
  },
  header: {
    margin: 0
  },
  row: {
    display: 'inline-block'
  }
});

const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
  if (!props) {
    return null;
  }

  const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = tooltipHostProps => (
    <TooltipHost {...tooltipHostProps} />
  );

  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      {defaultRender!({
        ...props,
        onRenderColumnHeaderTooltip
      })}
    </Sticky>
  );
};

const onRenderDetailsFooter: IRenderFunction<IDetailsFooterProps> = (props, defaultRender) => {
  if (!props) {
    return null;
  }

  return (
    <Sticky stickyPosition={StickyPositionType.Footer} isScrollSynced={true}>
      <div className={classNames.row}>
        <DetailsRow
          columns={props.columns}
          item={_footerItem}
          itemIndex={-1}
          selection={props.selection}
          selectionMode={(props.selection && props.selection.mode) || SelectionMode.none}
          rowWidth={props.rowWidth}
        />
      </div>
    </Sticky>
  );
};

export interface IDetailsListBasicExampleItem {
  _id: string;
  id:string;
  company: string;
  email: string;
  phone: string;
  address: string;
  date: Date;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
  dialogVisible: boolean;
}

export class List extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];
  private _dialog: DialogBlockingExample;

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
      selectionDetails: this._getSelectionDetails(),
      dialogVisible: false
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
    const selectionCount = this._selection.getSelectedCount();
    if (selectionCount === 0) return;
    const item : IDetailsListBasicExampleItem = this._selection.getSelection()[0];
    this._dialog._showDialog(item._id);
    
  };

  public render(): JSX.Element {
    const { items, selectionDetails, dialogVisible } = this.state;

    return (
      <Fabric>

      <DialogBlockingExample  ref={ref => (this._dialog = ref)}  />
<ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
<Sticky stickyPosition={StickyPositionType.Header}>
            <Toolbar onButtonClick={this.onButtonClick} />
          </Sticky>

<MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked}
            onRenderDetailsHeader={onRenderDetailsHeader}
            onRenderDetailsFooter={onRenderDetailsFooter}
            constrainMode={ConstrainMode.unconstrained}
          />
        </MarqueeSelection>
          <Sticky stickyPosition={StickyPositionType.Footer}>
             <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
          </Sticky>
</ScrollablePane>

     
       
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
    if (!item) return;
    item.id = item._id;
    item.date = new Date(2000, 2,2);
    this._dialog._showDialog(item);
  };
}
