import * as React from 'react';
import {IXrmDropdownProps, IXrmDropdownState} from './dropdown.types';
import { initializeComponentRef } from '@uifabric/utilities';
import { Dropdown, IDropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export class XrmDropdownBase extends React.Component<IXrmDropdownProps, IXrmDropdownState>  {
   
  constructor(props: IXrmDropdownProps) {
    super(props);
    initializeComponentRef(this);

    this.onChange = this.onChange.bind(this);

    let options: IDropdownOption[] = [];
    let selectedIndices: number[];

    this.state =  {
      isOpen: false,
      hasFocus: false,
      calloutRenderEdge: undefined,
      selectedIndices: selectedIndices,
      options: options,
      selectedKey: null
    };
    
  }

  /**
    * Populate dropdown list from metadata
    */
  componentWillMount() {
    const {entity, optionSet, required} = this.props;
    const self = this;

    let repeat: number = 0;
    let intervalId = setInterval(function() {
      repeat++;
      if (window.xrm && window.xrm.metadata && window.xrm.metadata[entity]) {
        clearInterval(intervalId);
        const metaData = window.xrm.metadata[entity];

        let sourceOptions = [];
        if (!required) {
          sourceOptions.push({});
        }
        metaData.value.forEach(function(v) {
          if (v.LogicalName === optionSet) {
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
        else {
          // retry 5x
          if (repeat >= 5) {
            clearInterval(intervalId);
          }
        }
    }, 400);
  }

  componentDidMount() {
    const {entity, optionSet, attribute, data} = this.props;

  }

  /**
   * Update selected key
   */
  componentWillReceiveProps(nextProps, nextState) {
    const {entity, optionSet, attribute, data} = this.props;

    if (!data || !attribute || !data[attribute]) return;
    this.setState(
      {
        selectedKey: data[attribute].value
      }
    );
  }


    /**
     * 
     */
   private onChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) :void => {
     const {selectedKey, id, data, onChange} = this.props;

    if (option === null) {
     this.setState(
       {selectedKey: null}
      );
      return;
    }

    

     this.setState(
       {selectedKey: option.key}
     );

    if (data) {
     data[id] = {
      value: option.key,
      label: option.text
     };

    }

     if (onChange) {
       onChange(event, option, index);
     }
   }

  public render(): JSX.Element {
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
      selectedKey,
      attribute,
      id
    } = this.props;


    return (
      <Dropdown
        id={id}
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