import * as React from 'react';
import { initializeComponentRef } from '@uifabric/utilities';
import { Dropdown, IDropdown, IDropdownProps, DropdownMenuItemType, IDropdownOption, IDropdownInternalProps, IDropdownState } from 'office-ui-fabric-react/lib/Dropdown';

export interface IXrmDropdownInternalProps extends IDropdownInternalProps {}

export interface IXrmDropdownState extends IDropdownState {
  options: IDropdownOption[],
  selectedKey: string
}

export class XrmDropdownBase extends React.Component<IXrmDropdownInternalProps, IXrmDropdownState>  {
   
  constructor(props: IDropdownProps) {
    super(props);
    initializeComponentRef(this);

    this.onChange = this.onChange.bind(this);

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
          { key: '1', text: 'Apple'},
          { key: '2', text: 'Banana' },
          { key: '3', text: 'Grape'}
        ];

      this.setState({
        options : ido,
        selectedKey: "1"
        });
  }

  private onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) :void => {
    
      console.log("selected");
    console.log(option);
    console.log(index);
    debugger;
    this.setState({
      selectedKey: option.key
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
        onChange={this.onChange}
       options={this.state.options}/>
    );
  }
}