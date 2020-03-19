import * as React from 'react';
import { Dropdown, IDropdown, IDropdownProps, DropdownMenuItemType, IDropdownOption, IDropdownInternalProps, IDropdownState } from 'office-ui-fabric-react/lib/Dropdown';

export interface IXrmDropdownInternalProps extends IDropdownInternalProps {}

export interface IXrmDropdownState extends IDropdownState {}

export class XrmDropdownBase extends React.Component<IXrmDropdownInternalProps, IXrmDropdownState>  {
  public static defaultProps = {
    options: [] as any[],
  };

  constructor(props: IDropdownProps) {
  super(props);
  }
  public render(): JSX.Element {
    
    const props = this.props;
    const {
      className,
      label,
      options,
      ariaLabel,
      required,
      errorMessage,
      keytipProps,
      styles: propStyles,
      theme,
      panelProps,
      calloutProps,
      multiSelect,
      disabled
    } = props;

    return (
      <Dropdown
      className={className}
        label={label}
        ariaLabel={ariaLabel}
        required={required}
        errorMessage={errorMessage}
        keytipProps={keytipProps}
        theme={theme}
        panelProps={panelProps}
        calloutProps={calloutProps}
        multiSelect={multiSelect}
        disabled={disabled}

       options={[
          { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
          { key: 'apple', text: 'Apple'},
          { key: 'banana', text: 'Banana' },
          { key: 'orange', text: 'Orange', disabled: true },
          { key: 'grape', text: 'Grape', selected: true  },
          { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
          { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
          { key: 'broccoli', text: 'Broccoli' },
          { key: 'carrot', text: 'Carrot' },
          { key: 'lettuce', text: 'Lettuce' }
        ]}/>
    );
  }
}