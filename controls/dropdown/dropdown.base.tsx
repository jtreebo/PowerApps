import * as React from 'react';
import { initializeComponentRef } from '@uifabric/utilities';
import { Dropdown, IDropdown, IDropdownProps, DropdownMenuItemType, IDropdownOption, IDropdownInternalProps, IDropdownState } from 'office-ui-fabric-react/lib/Dropdown';
import { from } from "linq-to-typescript"

export interface IXrmDropdownInternalProps extends IDropdownInternalProps {
  entity: string;
  source: string;
  model: string;
  onSelect: any;
  data:any;
}

export interface IXrmDropdownState extends IDropdownState {
  options: IDropdownOption[],
  selectedKey: any
}

export class XrmDropdownBase extends React.Component<IXrmDropdownInternalProps, IXrmDropdownState>  {
   
  constructor(props: IXrmDropdownInternalProps) {
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
                const o : IDropdownOption = {
                  key: option.Value,
                  text: label
                };
                sourceOptions.push(o);
            });

          }
        });
        self.setState({
          options : sourceOptions
          });
        }
    }, 400);
  }

  componentDidMount() {
    const {entity, source, model, data} = this.props;

  }
componentWillReceiveProps(nextProps, nextState) {
  const {entity, source, model, data} = this.props;

    if (!data || !model || !data[model]) return;
    this.setState(
      {
        selectedKey: data[model].value
      }
    );


    
}


  updateAndNotify = () => {
      console.log("updateAndNotify");
    }

  private defaultSelectedKey = ():void => {
    debugger;
  }

   private onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) :void => {

    if (option === null) {
     this.setState(
       {selectedKey: null}
     );
      return;}

     const {onSelect, selectedKey, model, data, onChange} = this.props;

     this.setState(
       {selectedKey: option.key}
     );

    if (data) {
     data[model] = {
      value: option.key,
      label: option.text
     };

    }

     if (onSelect) {
        onSelect(option, index, model);
     }
     if (onChange) {
       onChange(event, option, index);
     }
     
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
      disabled,
      onChange,
      defaultSelectedKey,
      selectedKey,
      model
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