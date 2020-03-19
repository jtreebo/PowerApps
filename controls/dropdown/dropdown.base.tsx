import * as React from 'react';
import { initializeComponentRef } from '@uifabric/utilities';
import { Dropdown, IDropdown, IDropdownProps, DropdownMenuItemType, IDropdownOption, IDropdownInternalProps, IDropdownState } from 'office-ui-fabric-react/lib/Dropdown';

export interface IXrmDropdownInternalProps extends IDropdownInternalProps {}

export interface IXrmDropdownState extends IDropdownState {
  options: IDropdownOption[],
  selectedKey: string
}

export class XrmDropdownBase extends React.Component<IXrmDropdownInternalProps, IXrmDropdownState>  {
  public static defaultProps = {
    options: [] as any[],
  };

  

  constructor(props: IDropdownProps) {
    super(props);
    initializeComponentRef(this);

    let ido: IDropdownOption[] = [];
    let selectedIndices: number[];

    this.state =  {
      isOpen: false,
      hasFocus: false,
      calloutRenderEdge: undefined,
      selectedIndices: selectedIndices,
      options: ido,
      selectedKey: null
    };
    
  }

  componentDidMount() {
    let ido: IDropdownOption[] = [          
          { key: 'apple', text: 'Apple'},
          { key: 'banana', text: 'Banana' },
          { key: 'grape', text: 'Grape'},
          { key: 'broccoli', text: 'Broccoli' },
          { key: 'carrot', text: 'Carrot' },
          { key: 'lettuce', text: 'Lettuce' }
        ];

      this.setState({
        options : ido,
        selectedKey: "lettuce"
        });
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
        selectedKey={this.state.selectedKey}
       options={this.state.options}/>
    );
  }
}