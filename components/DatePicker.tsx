import React, { Component } from "react";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {  DefaultButton,  PrimaryButton,  Stack,  IStackTokens} from "office-ui-fabric-react";
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

interface AppProps {}
interface AppState {
  name: string;
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});
const stackTokens: IStackTokens = { childrenGap: 10 };

export class DatePickerFormatExample extends React.Component<{}, {}> {
  public constructor(props: {}) {
    super(props);

this._onSelectDate = this._onSelectDate.bind(this);
    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
      value: null
    };
  }

  public render(): JSX.Element {
    const { firstDayOfWeek, value } = this.state;
    const desc = 'This field is required. One of the support input formats is year dash month dash day.';
    return (
      <div className="docs-DatePickerExample">
        
        <DatePicker
          className={controlClass.control}
          label="Start date"
          isRequired={false}
          allowTextInput={true}
          onSelectDate={this._onSelectDate}
        />
       
      </div>
    );
  }

  _onSelectDate = (date: Date | null | undefined): void => {
    console.log(date);
    this.setState({ value: date });
  };

  _onClick = (): void => {
    this.setState({ value: null });
  };

  _onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  private _onParseDateFromString = (value: string): Date => {
    const date = this.state.value || new Date();
    const values = (value || '').trim().split('/');
    const day = values.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month = values.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year = values.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  };
}
