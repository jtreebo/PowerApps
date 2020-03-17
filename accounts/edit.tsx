import * as React from 'react';
import { render } from "react-dom";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/ComboBox';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';


export interface IDialogBlockingExampleState {
  hideDialog: boolean;
  isDraggable: boolean;
  data: {
    id:string,
    date: Date
  };
  
}

const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' }
];

const stackTokens: IStackTokens = { childrenGap: 10 };
 

export class DialogBlockingExample extends React.Component<{}, IDialogBlockingExampleState> {

  constructor(props: {}) {
    super(props);
this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      hideDialog: true,
      isDraggable: false,
      data: {
        id: "",
        date: new Date()
      }
    };
  }

handleChange(event) {
    let data = this.state.data;

    data[event.target.name] = event.target.value;
    this.setState({data: data});

        console.log(data);
  }

  handleDateChange(date) {
    let data = this.state.data;

    data.date = date;
    this.setState({data: data});
  }

  private renderDetail() {
    console.log("tab1");
  return (
    <div>
      <Stack horizontal tokens={stackTokens}>
      <Stack.Item grow>
                      <TextField label="Name" name="id" required value={this.state.data.id} onChange={this.handleChange} />

        <SpinButton
                        defaultValue="0"
                        labelPosition="top"
                        label={'Number of subjects to add:'}
                        min={0}
                        max={100}
                        step={1}
                        iconProps={{ iconName: 'IncreaseIndentLegacy' }}
                        // tslint:disable:jsx-no-lambda
                        onFocus={() => console.log('onFocus called')}
                        onBlur={() => console.log('onBlur called')}
                        incrementButtonAriaLabel={'Increase value by 1'}
                        decrementButtonAriaLabel={'Decrease value by 1'}
                      />
      </Stack.Item>
      <Stack.Item grow>
                      <ComboBox 
                        label="Sample subject lines you could add instead"
                        placeholder="Select or type an option"
                        autoComplete="on"
                        options={INITIAL_OPTIONS}
                      />
      </Stack.Item>
      </Stack>
      </div>
  )
}

 

  private _dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu
  };

  public render() {
    const { hideDialog, isDraggable, data } = this.state;
    return (
      <div>
        
        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Account',
            subText: ''
          }}
          modalProps={{
            isBlocking: true,
                        topOffsetFixed: true,
            styles: { main: { 
              selectors: {
                ['@media (min-width: 480px)']: {
                  width: '600px',
                  
                  minWidth: '600px',
                  maxWidth: '800px'
                }
              }} 
              },
            dragOptions: isDraggable ? this._dragOptions : undefined
          }}
        >

<Pivot aria-label="Basic Pivot Example">
          <PivotItem   headerText="Detail">
            {this.renderDetail()}
              
          </PivotItem>
          <PivotItem headerText="Views">
            
<DatePicker
          label="Start date"
          isRequired={false}
          allowTextInput={true}
          value={this.state.data.date}
          onSelectDate={this.handleDateChange}
        />

          </PivotItem>
          <PivotItem headerText="Filters">
            <Label >Pivot #3</Label>
          </PivotItem>
        </Pivot>
<DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Send" />
            <DefaultButton onClick={this._closeDialog} text="Don't send" />
          </DialogFooter>


        

          
         
        </Dialog>
      </div>
    );
  }




  private _showDialog = (id: string): void => {
      let data = this.state.data;
      data.id = id;
        this.setState({ hideDialog: false, data: data });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}
