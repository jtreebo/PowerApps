import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
export interface IDetailsListDocumentsExampleState {
  items: ICommandBarItemProps[];

}
export class CommandBarBasicExample extends React.Component<{}, IDetailsListDocumentsExampleState> {
  constructor(props: {}) {
    super(props);

    const _items: ICommandBarItemProps[] = [
      {
        key: 'newItem',
        text: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
        iconProps: { iconName: 'Add' },
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' },
              ['data-automation-id']: 'newEmailButton' // optional
            },
            {
              key: 'calendarEvent',
              text: 'Calendar event',
              iconProps: { iconName: 'Calendar' }
            }
          ]
        }
      },
      {
        key: 'upload',
        text: 'Upload',
        iconProps: { iconName: 'Upload' },
        href: 'https://dev.office.com/fabric'
      },
      {
        key: 'share',
        text: 'Share',
        iconProps: { iconName: 'Share' },
        onClick: () => console.log('Share')
      },
      {
        key: 'download',
        text: 'Download',
        iconProps: { iconName: 'Download' },
        onClick: () => console.log('Download')
      }
    ];

    this.state = {
      items: _items
    };




  }
  render() {
    const { items } = this.state;
    return (
      <div>
        <CommandBar
          items={items}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
      </div>
    );
  }

};

