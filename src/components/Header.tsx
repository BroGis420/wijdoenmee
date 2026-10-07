import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Logo from './Logo.tsx'
import PhraseLink from './PhraseLink.tsx'
import MenuToggle from './MenuToggle.tsx'
import Breadcrumbs from './Breadcrumbs.tsx'
import BackNavigation from './BackNavigation.tsx'
import NavigationMenu from './NavigationMenu.tsx'


        type HeaderData = {
            largeNavigationDataId: string;
            smallNavigationDataId: string;
            breadcrumbs?: {
                dataId: string;
                backRoute: string;
            };
        };
    
// Component

        function Header({
            dataId
        }: {
            dataId: string;
        }) {
            const {
                largeNavigationDataId,
                smallNavigationDataId,
                breadcrumbs
            }: HeaderData = getHeaderData(dataId);

            return (
                <header className={"content"}>
                    <div className={"header--large large-only"}>
                        <div className={"header__top"}>
                            <div className={"logo"}>
                                <Logo />
                            </div>
                            {breadcrumbs && (
                                <HeaderBreadcrumbs
                                    dataId={breadcrumbs.dataId}
                                    backRoute={breadcrumbs.backRoute}
                                />
                            )}
                        </div>
                        <nav className={"nav__main"}>
                            <NavigationMenu dataId={largeNavigationDataId} />
                        </nav>
                    </div>
                    <div className={"header--small small-only"}>
                        <div className={"header__top"}>
                            <div className={"logo"}>
                                <PhraseLink />
                            </div>
                            {breadcrumbs && (
                                <HeaderBreadcrumbs
                                    dataId={breadcrumbs.dataId}
                                    backRoute={breadcrumbs.backRoute}
                                />
                            )}
                        </div>
                        <MenuToggle />
                        <nav
                            className={"nav__main nav__main--small"}
                            style={{display:"none"}}
                        >
                            <NavigationMenu dataId={smallNavigationDataId} />
                        </nav>
                    </div>
                </header>
            );
        }
    

// Subcomponents

        function HeaderBreadcrumbs({
            dataId,
            backRoute
        }: {
            dataId: string;
            backRoute: string;
        }) {
            return (
                <div id={"block-rekall-theme-breadcrumbs"}>
                    <div className={"breadcrumb large-only"}>
                        <nav>
                            <Breadcrumbs dataId={dataId} />
                        </nav>
                    </div>
                    <div className={"breadcrumb small-only"}>
                        <nav>
                            <BackNavigation route={backRoute} />
                        </nav>
                    </div>
                </div>
            );
        }
    

function getHeaderData(id): HeaderData  {
    switch (String(id)) {
    case "0":
        return ({
                    "largeNavigationDataId": "0",
                    "smallNavigationDataId": "0",
                    "breadcrumbs": undefined
                });
    case "1":
        return ({
                    "largeNavigationDataId": "3",
                    "smallNavigationDataId": "3",
                    "breadcrumbs": {
                        "dataId": "0",
                        "backRoute": "/"
                    }
                });
    case "2":
        return ({
                    "largeNavigationDataId": "4",
                    "smallNavigationDataId": "4",
                    "breadcrumbs": {
                        "dataId": "1",
                        "backRoute": "/"
                    }
                });
    case "3":
        return ({
                    "largeNavigationDataId": "5",
                    "smallNavigationDataId": "4",
                    "breadcrumbs": {
                        "dataId": "2",
                        "backRoute": "/inspiratie"
                    }
                });
    case "4":
        return ({
                    "largeNavigationDataId": "6",
                    "smallNavigationDataId": "3",
                    "breadcrumbs": {
                        "dataId": "0",
                        "backRoute": "/"
                    }
                });
    case "5":
        return ({
                    "largeNavigationDataId": "7",
                    "smallNavigationDataId": "7",
                    "breadcrumbs": {
                        "dataId": "3",
                        "backRoute": "/"
                    }
                });
    default:
        return ({
                    "largeNavigationDataId": "0",
                    "smallNavigationDataId": "0",
                    "breadcrumbs": undefined
                });
    }
}


export default Header
