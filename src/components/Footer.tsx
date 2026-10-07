import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import PartnerLink from './PartnerLink.tsx'
import NavigationMenu from './NavigationMenu.tsx'


// Component

        function Footer() {
            return (
                <footer className={"full-bleed"}>
                    <div className={"content"}>
                        <FooterNavigation dataId="1" />
                        <FooterNavigation dataId="2" />
                        <div className={"footer__partners"}>
                            <PartnerLink dataId="0" />
                            <PartnerLink dataId="1" />
                            <PartnerLink dataId="2" />
                        </div>
                        <div className={"footer__copyright"}>
                            <p>
                                © 2026
                            </p>
                            <p>
                                {`Gemaakt door `}
                                <a
                                    className={"ext external-link"}
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}
                                    title={"(opens in a new window)"}
                                    data-navigate-routes={JSON.stringify(["/"])}
                                >
                                    Rekall
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            )
        }
    

// Subcomponents

        function FooterNavigation({ dataId }: { dataId: string }) {
            return (
                <div className={"footer__links"}>
                    <nav className={"nav__footer"}>
                        <NavigationMenu dataId={dataId} />
                    </nav>
                </div>
            )
        }
    

export default Footer
