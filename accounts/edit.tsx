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



export interface IDialogBlockingExampleState {
  hideDialog: boolean;
  isDraggable: boolean;
  id:string;
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

    this.state = {
      hideDialog: true,
      isDraggable: false,
      id: ""
    };
  }

private renderDetail() {
  return (
    <div>
      <Stack tokens={stackTokens}>
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
                      <TextField label="Name" name="name" required value={this.state.id} />

                      <ComboBox 
                        label="Sample subject lines you could add instead"
                        placeholder="Select or type an option"
                        autoComplete="on"
                        options={INITIAL_OPTIONS}
                      />

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
    const { hideDialog, isDraggable, id } = this.state;
    return (
      <div>
        
        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Missing Subject',
            subText: 'Do you want to send this message without a subject?'
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { 
              selectors: {
                ['@media (min-width: 480px)']: {
                  width: '90%',
                  height: '90%',
                  minWidth: '90%',
                  maxWidth: '1000px'
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
            <Label >Pivot #2</Label>
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
        this.setState({ hideDialog: false, id: id });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}
