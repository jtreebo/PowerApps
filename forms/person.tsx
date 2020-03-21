import React, { Component } from 'react';
import { render } from 'react-dom';
import {  DefaultButton,  PrimaryButton,  IStackTokens, } from "office-ui-fabric-react";
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { IContact } from './data/IContact';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown, IDropdown, IDropdownProps, DropdownMenuItemType, IDropdownOption, IDropdownInternalProps, IDropdownState } from 'office-ui-fabric-react/lib/Dropdown';

import { Xrm } from '../controls/xrm';
import { XrmDropdown } from '../controls/dropdown';
interface AppProps { }

interface AppState {
  name: string;
  data: IContact;
  selectedKey: any;
  }

const entities: string[] = ["contact", "account"]
const stackTokens: IStackTokens = { childrenGap: 15 };
const contactData: IContact = {};

const ido: IDropdownOption[] = [          
          { key: 1, text: 'Apple'},
          { key: 2, text: 'Banana' },
          { key: 3, text: 'Grape'}
        ];

export class Person extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      data: {},
      selectedKey: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    var self = this;
    this.getData().then( () => {
        self.forceUpdate();
    });

  }

  componentDidMount() {
    //this.getData();
  }

  getData() {

    var getDate = new Promise<boolean>((resolve, reject) => {
  

      fetch('https://next.json-generator.com/api/json/get/4J94VS8r_')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          reject('Something went wrong ...');
        }
      })
      .then(data => {
        let index = Math.floor(Math.random() * Math.floor(5));
        const d = data[index];
        this.setState({ 
          data: d,
          selectedKey: d.fruit.key

          });

          resolve();
      });


    });
  

  return getDate;

    
  };

  private onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) :void => {
   
    if (option === null) return;
     let d = this.state.data;
     d[event.target.id] = option;
     this.setState(
       {
         data: d,
         selectedKey: option.key}
     );

  }

private onSelect = (option?: IDropdownOption, index?: number, model?: string) :void => {
  
        if (option === null) return;
         let d = this.state.data;
  }

_primaryClicked = (): void => {
    this.getData();
  };

_checkData = (): void => {
     let d = this.state.data;
     console.log(d);
  };
  handleChange(event) {
    let data = this.state.data;

    data[event.target.id] = event.target.value;
    this.setState({data: data});

        console.log(data);
  }

  
  handleDateChange = (date: Date | null | undefined): void => {
    console.log(date);
    let data = this.state.data;

    data.birthDate = date;
    this.setState({data: data});
  };

  toDate =(dateStr: string | null | undefined): Date | null => {
    if (!dateStr || isNaN(Date.parse(dateStr))) return;

    return new Date(dateStr);
  }

  render() {
    return (
      <Xrm optionSets={entities}>
      <Stack vertical tokens={stackTokens}>
        <TextField label="Firstname" name="firstName" id="firstName" required value={this.state.data.firstName} onChange={this.handleChange}/>
        <TextField label="Lastname" name="lastName" id="lastName" value={this.state.data.lastName} onChange={this.handleChange}/>
        

        <DatePicker label="Birthdate" name="birthDate" allowTextInput={true} fieldName="birthDate"
            value={this.toDate(this.state.data.birthDate)} 
            onSelectDate={this.handleDateChange}/>

        <XrmDropdown
          label="Marital Status" required
          entity="contact"
          optionSet="familystatuscode"
          attribute="familystatuscode"
          data={this.state.data}
        />

        <XrmDropdown
          label="Payment Terms" 
          entity="contact"
          optionSet="paymenttermscode"
          attribute="paymenttermscode"
          data={this.state.data}
        />

<Dropdown
          label="Test" 
          id="fruit"
          options={ido}
          selectedKey={this.state.selectedKey}
          onChange={this.onChange}
        />
        
      <Stack horizontal tokens={stackTokens}>
      <Stack.Item>
         <PrimaryButton
          text="Fetch Data"
          onClick={this._primaryClicked}/>
      </Stack.Item>
      <Stack.Item>
<PrimaryButton
          text="Check Data"
          onClick={this._checkData}/>
      </Stack.Item>
      </Stack>

         </Stack>
         </Xrm>
         
    );
  }
}


