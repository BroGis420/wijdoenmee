import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import NavigationLink from './NavigationLink.tsx'


        type NavigationMenuData = {
            items: Array<{
                className: string;
                navigationLinkDataId: string;
            }>;
        };
    
// Component

        function NavigationMenu({
            dataId
        }: {
            dataId: string;
        }) {
            const { items }: NavigationMenuData = getNavigationMenuData(dataId);

            return (
                <ul className={"menu"}>
                    {items.map((item, index) => (
                        <MenuItem
                            key={index}
                            className={item.className}
                            navigationLinkDataId={item.navigationLinkDataId}
                        />
                    ))}
                </ul>
            );
        }
    

// Subcomponents

        function MenuItem({
            className,
            navigationLinkDataId
        }: {
            className: string;
            navigationLinkDataId: string;
        }) {
            return (
                <li className={className}>
                    <NavigationLink dataId={navigationLinkDataId} />
                </li>
            );
        }
    

function getNavigationMenuData(id): NavigationMenuData  {
    switch (String(id)) {
    case "0":
        return ({
                    "items": [
                        {
                            "className": "menu-item menu-item--active-trail",
                            "navigationLinkDataId": "0"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "1"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "2"
                        },
                        {
                            "className": "search menu-item",
                            "navigationLinkDataId": "3"
                        }
                    ]
                });
    case "1":
        return ({
                    "items": [
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "8"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "9"
                        }
                    ]
                });
    case "2":
        return ({
                    "items": [
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "10"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "11"
                        }
                    ]
                });
    case "3":
        return ({
                    "items": [
                        { "className": "menu-item", "navigationLinkDataId": "0" },
                        { "className": "menu-item menu-item--active-trail", "navigationLinkDataId": "1" },
                        { "className": "menu-item", "navigationLinkDataId": "2" },
                        { "className": "search menu-item", "navigationLinkDataId": "3" }
                    ]
                });
    case "4":
        return ({
                    "items": [
                        { "className": "menu-item", "navigationLinkDataId": "0" },
                        { "className": "menu-item", "navigationLinkDataId": "1" },
                        { "className": "menu-item menu-item--active-trail", "navigationLinkDataId": "2" },
                        { "className": "search menu-item", "navigationLinkDataId": "3" }
                    ]
                });
    case "5":
        return ({
                    "items": [
                        { "className": "menu-item", "navigationLinkDataId": "0" },
                        { "className": "menu-item", "navigationLinkDataId": "27" },
                        { "className": "menu-item menu-item--active-trail", "navigationLinkDataId": "2" },
                        { "className": "search menu-item", "navigationLinkDataId": "3" }
                    ]
                });
    case "6":
        return ({
                    "items": [
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "28"
                        },
                        {
                            "className": "menu-item menu-item--active-trail",
                            "navigationLinkDataId": "1"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "2"
                        },
                        {
                            "className": "search menu-item",
                            "navigationLinkDataId": "3"
                        }
                    ]
                });
    case "7":
        return ({
                    "items": [
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "0"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "1"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "2"
                        },
                        {
                            "className": "search menu-item",
                            "navigationLinkDataId": "3"
                        }
                    ]
                });
    default:
        return ({
                    "items": [
                        {
                            "className": "menu-item menu-item--active-trail",
                            "navigationLinkDataId": "0"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "1"
                        },
                        {
                            "className": "menu-item",
                            "navigationLinkDataId": "2"
                        },
                        {
                            "className": "search menu-item",
                            "navigationLinkDataId": "3"
                        }
                    ]
                });
    }
}


export default NavigationMenu
