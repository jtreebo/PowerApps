import React, { FunctionComponent } from 'react'; 
import { Direction, IPagingProps } from './types';
import { createComponent, IViewComponent } from '@uifabric/foundation';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';



const PagingView: IViewComponent<IPagingProps> = props => {
  const { children, selectedCount, totalCount, currentPage, onNavigationClick} = props;
 
return ( <div>
  
<Stack horizontal grow>
  <Stack.Item grow >
  1 - 50 of {totalCount} ({selectedCount} Selected)
  </Stack.Item>
  
<Stack.Item grow >
<Stack grow horizontal horizontalAlign="end">
<ActionButton iconProps={
      {iconName: 'ChevronLeftEnd6'}
} onClick={() => {
      onNavigationClick(Direction.firstPage);
    }} />
    <ActionButton iconProps={
      {iconName: 'ChevronLeftSmall'}
} onClick={() => {
      onNavigationClick(Direction.previousPage);
    }} />
    <ActionButton disabled>
      Page {currentPage}
    </ActionButton>

    <ActionButton iconProps={{iconName: 'ChevronRightSmall'} } onClick={() => {
      onNavigationClick(Direction.nextPage);
    }} />


</Stack>
  </Stack.Item>
  </Stack>
   
</div>)
  
};

export const Paging: React.FunctionComponent<IPagingProps> = createComponent(PagingView);

export default Paging;