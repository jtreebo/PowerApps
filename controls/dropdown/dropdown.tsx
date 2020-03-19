import * as React from 'react';
import { styled } from '@uifabric/utilities';
import { XrmDropdownBase } from './dropdown.base';
import { IDropdownProps, IDropdownStyleProps, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';


export const XrmDropdown: React.FunctionComponent<IDropdownProps> = styled<
  IDropdownProps,
  IDropdownStyleProps,
  IDropdownStyles
>(XrmDropdownBase, undefined, undefined, {
  scope: 'XrmDropdown'
});