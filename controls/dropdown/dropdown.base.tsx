import * as React from 'react';
import { initializeComponentRef } from '@uifabric/utilities';
import { Dropdown, IDropdown, IDropdownProps, DropdownMenuItemType, IDropdownOption, IDropdownInternalProps, IDropdownState } from 'office-ui-fabric-react/lib/Dropdown';
import { from } from "linq-to-typescript"

export interface IXrmDropdownInternalProps extends IDropdownInternalProps {
  entity: string;
  source: string;
}

export interface IXrmDropdownState extends IDropdownState {
  options: IDropdownOption[]
}

export class XrmDropdownBase extends React.Component<IXrmDropdownInternalProps, IXrmDropdownState>  {
   
  constructor(props: IXrmDropdownInternalProps) {
    super(props);
    initializeComponentRef(this);

    let ido: IDropdownOption[] = [];
    let selectedIndices: number[];

    this.state =  {
      isOpen: false,
      hasFocus: false,
      calloutRenderEdge: undefined,
      selectedIndices: selectedIndices,
      options: ido
    };
    
  }

  componentWillMount() {
    const {entity, source, required} = this.props;
    const self = this;

    let intervalId = setInterval(function() {
      if (window.xrm && window.xrm.metadata && window.xrm.metadata[entity]) {
        clearInterval(intervalId);
        const metaData = window.xrm.metadata[entity];

        let sourceOptions = [];
        if (!required) {
          sourceOptions.push({});
        }
        metaData.value.forEach(function(v) {
          if (v.LogicalName === source) {
            var options = v.OptionSet.Options;
            options.forEach(function(option) {
                let label = option.Label.LocalizedLabels[0].Label;
                sourceOptions.push({
                  key: option.Value,
                  text: label
                });
            });

          }
        });
        self.setState({
          options : sourceOptions
          });

        }
    }, 400);

    
  }

  // private onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) :void => {
  //   console.log("base dd");
  //     if (option === null) return;

  //   const {onChange,selectedKey} = this.props;
  //   onChange(event, option, index);

  //     this.setState({
  //     selectedKey: option.key
  //   });
  // }

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
      disabled,
      onChange,
      selectedKey
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
        selectedKey={selectedKey}        
        onChange={onChange}
       options={this.state.options}/>
    );
  }
}