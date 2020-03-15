import React, { Component } from "react";
import { render } from "react-dom";
import { CommandBar, ICommandBarItemProps} from "office-ui-fabric-react/lib/CommandBar";
import {  DefaultButton,  PrimaryButton,  Stack,  IStackTokens} from "office-ui-fabric-react";

interface AppProps {}
interface AppState {
  name: string;
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export class Buttons extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      disabled: false
    };
  }

  render() {
    return (
      <Stack horizontal tokens={stackTokens}>
        <DefaultButton
          text="Standard"
          onClick={this._alertClicked}
          allowDisabledFocus
          disabled={this.state.disabled}
          checked={this.state.checked}
        />
        <PrimaryButton
          text="Primary"
          onClick={this._primaryClicked}
          allowDisabledFocus
          disabled={this.state.disabled}
          checked={this.state.checked}
        />
      </Stack>
    );
  }

  _alertClicked = (): void => {
    alert("Clicked");
  };

  _primaryClicked = (): void => {
    alert(this.state);
  };
}



