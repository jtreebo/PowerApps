import React, { Component } from 'react';
import { render } from 'react-dom';
import {  DefaultButton,  PrimaryButton,  IStackTokens, } from "office-ui-fabric-react";
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { IContact } from './data/IContact';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { XrmDropdown } from '../controls/dropdown';
interface AppProps { }

interface AppState {
  name: string;
  data: IContact;
  }

const stackTokens: IStackTokens = { childrenGap: 15 };
const contactData: IContact = {};

export class Person extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      data: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  componentDidMount() {
    console.log("mount");
    this.getData();
  }

  getData() {
    fetch('https://next.json-generator.com/api/json/get/4J94VS8r_')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        let index = Math.floor(Math.random() * Math.floor(5));
        let d = data[index];
        //d.birthDate = new Date(d.birthDate);
        console.log(data[index]);
        this.setState({ data: data[index] });
      })
  };

_primaryClicked = (): void => {
    this.getData();
  };

  handleChange(event) {
    let data = this.state.data;

    data[event.target.id] = event.target.value;
    this.setState({data: data});

        console.log(data);
  }

  
  parseDateFromString = (dateStr: string): Date | null => {
    console.log(dateStr);
    return new Date(Date.parse(dateStr))
  };

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
      <Stack vertical tokens={stackTokens}>
        <TextField label="Firstname" name="firstName" id="firstName" required value={this.state.data.firstName} onChange={this.handleChange}/>
        <TextField label="Lastname" name="lastName" id="firstName" value={this.state.data.lastName} onChange={this.handleChange}/>
        <DatePicker label="Birthdate" name="birthDate" allowTextInput={true} fieldName="birthDate"
            value={this.toDate(this.state.data.birthDate)} 
            onSelectDate={this.handleDateChange}/>

        <XrmDropdown
          label="Type" required
          entity="contact"
          source="familystatuscode"
          model="familystatuscode"
          convertToNumber={true}
        />

         <PrimaryButton
          text="Fetch Data"
          onClick={this._primaryClicked}/>
         </Stack>
    );
  }
}


