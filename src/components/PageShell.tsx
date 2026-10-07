import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Header from './Header.tsx'
import HomeContent from './HomeContent.tsx'
import Footer from './Footer.tsx'
import ContentPage from './ContentPage.tsx'
import ListingMain from './ListingMain.tsx'


        type PageShellData =
            | {
                headerDataId: string;
                contentType: "home";
            }
            | {
                headerDataId: string;
                contentType: "toolsRoute";
            }
            | {
                headerDataId: string;
                contentType: "listing";
                contentDataId: string;
            }
            | {
                headerDataId: string;
                contentType: "contentPage";
                contentDataId: string;
            };
    
// Component

        function PageShell({ dataId }: { dataId: string }) {
            const location = useLocation()
            const data: PageShellData = getPageShellData(dataId)

            const content = (() => {
                switch (data.contentType) {
                    case "home":
                        return <HomeContent />
                    case "toolsRoute":
                        switch (location.pathname + location.search + location.hash) {
                            case "/tools":
                                return <ListingMain dataId="0" />
                            case "/tools":
                                return <ListingMain dataId="1" />
                            default:
                                return null
                        }
                    case "listing":
                        return <ListingMain dataId={data.contentDataId} />
                    case "contentPage":
                        return <ContentPage dataId={data.contentDataId} />
                    default:
                        return null
                }
            })()

            return (
                <body data-once={"klaro"}>
                    <a
                        className={"visually-hidden focusable skip-link"}
                        data-navigate-routes={JSON.stringify(["/#main-content"])}
                    >
                        {`
             Overslaan en naar de inhoud gaan
            `}
                    </a>
                    <div className={"dialog-off-canvas-main-canvas"}>
                        <Header dataId={data.headerDataId} />
                        <div className={"hidden"}>
                        </div>
                        {content}
                        <Footer />
                    </div>
                    <div id={"drupal-live-announce"} className={"visually-hidden"}>
                    </div>
                    <div
                        id={"klaro"}
                        style={{
                            "--button-text-color": "#fff",
                            "--dark1": "#fafafa",
                            "--dark2": "#777",
                            "--dark3": "#555",
                            "--light1": "#444",
                            "--light2": "#666",
                            "--light3": "#111",
                            "--green3": "#f00"
                        } as React.CSSProperties}
                    >
                        <div
                            lang={"nl"}
                            className={"klaro hide-consent-dialog-title klaro-theme-rekall_theme"}
                        >
                            <div>
                            </div>
                        </div>
                    </div>
                </body>
            )
        }
    


        function getPageShellData(id: string): PageShellData {
            const stringId = String(id)

            switch (stringId) {
                case "0":
                    return {
                        headerDataId: "0",
                        contentType: "home"
                    }
                case "1":
                    return {
                        headerDataId: "1",
                        contentType: "toolsRoute"
                    }
                case "2":
                    return {
                        headerDataId: "2",
                        contentType: "listing",
                        contentDataId: "2"
                    }
                case "3":
                    return {
                        headerDataId: "3",
                        contentType: "contentPage",
                        contentDataId: "0"
                    }
                case "4":
                    return {
                        headerDataId: "4",
                        contentType: "listing",
                        contentDataId: "3"
                    }
                case "5":
                    return {
                        headerDataId: "5",
                        contentType: "contentPage",
                        contentDataId: "1"
                    }
                default:
                    return {
                        headerDataId: "0",
                        contentType: "home"
                    }
            }
        }
    

export default PageShell
