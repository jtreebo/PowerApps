import React, { Component, useState, Suspense, lazy } from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Account } from '.././forms/account';
import { Person } from '.././forms/person';
import { AccountList } from '.././accounts/list';
import { ShimmerApplicationExample } from '.././accounts/detailList';
import { DetailsListBasicExample } from '.././accounts/detailListBasic';

export class Navigate extends Component {
    static displayName = Navigate.name;

    constructor(props) {
        super(props);

        this.state = {
            selectedKey: "key3"
        };

        this.onLinkClick = this.onLinkClick.bind(this);
        
    }

    onLinkClick(ev: React.MouseEvent<HTMLElement>, item?: INavLink) {
      
     let component = null;
    switch(item.key) {
      case "person":
        component = <Person />;
        break;
      case "account":
        component = <Account />;
        break;
      case "accountList":
        component = <AccountList />;
        break;
      case "shimmerApplicationExample":
        component = <ShimmerApplicationExample />;
        break;
      case "detailListBasic":
        component = <DetailsListBasicExample />;
        break;

        
      default:
        component = <Person />;
    }
      
      render(
        <Suspense fallback={<div>Loading...</div>}>
              {component}
            </Suspense>
        , document.getElementById('detail'));

    }

    render() {
        return (
            <Nav
                onLinkClick={this.onLinkClick}
                selectedKey="{this.state.selectedKey}"
                selectedAriaLabel="Selected"
                ariaLabel="Nav basic example"
                styles={{
                    root: {
                        width: 208,
                        borderRight: '1px solid rgb(216, 216, 216)',
                        backgroundColor: 'rgb(239, 239, 239)',
                        overflowY: 'auto',
                        position: 'relative'
                    }
                }}
                groups={[
                    {
                        links: [
                            {
                                name: 'Dashboard',
                                url: '',
                                expandAriaLabel: 'Expand Home section',
                                collapseAriaLabel: 'Collapse Home section',
                                links: [
                                    {
                                        name: 'Person',
                                        icon: 'Contact',
                                        url: '',
                                        key: 'person',
                                        target: '_blank'
                                    },
                                    {
                                        name: 'Account',
                                        icon: 'AccountManagement',
                                        url: '',
                                        key: 'account',
                                        target: '_blank'
                                    },
                                    {
                                        name: 'Data',
                                        icon: 'AccountManagement',
                                        url: '',
                                        key: 'accountList',
                                        target: '_blank'
                                    },
                                    {
                                        name: 'Shimmer',
                                        icon: 'AccountManagement',
                                        url: '',
                                        key: 'shimmerApplicationExample',
                                        target: '_blank'
                                    },
                                    
                                ],
                                isExpanded: true
                            },
                           {
                                        name: 'Accounts',
                                        icon: 'AccountManagement',
                                        url: '',
                                        key: 'detailListBasic',
                                        target: '_blank'
                                    }
                            
                        ]
                    }
                ]}
                />
        );
    }
}
