import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import ConsentButton from './ConsentButton.tsx'
import PrivacySettingsLink from './PrivacySettingsLink.tsx'


// Component
function MediaEmbed() {
    return <div className={"embed-wrapper"}>
        <div data-type={"placeholder"} style={{maxWidth:"200px", height:"113px"}}>
            <div lang={"nl"} className={"klaro hide-consent-dialog-title klaro-theme-rekall_theme cm-as-context-notice"}>
                <div className={"context-notice"}>
                    <p>
                        Externe inhoud van YouTube laden?
                    </p>
                    <p className={"cm-buttons"}>
                        
                                    <ConsentButton label="Ja (enkel deze ene keer)" variant="success" />
                                
                        
                                    <ConsentButton label="Altijd" variant="success-var" />
                                
                    </p>
                    <p className={"cm-dialog-link"}>
                        <PrivacySettingsLink />
                    </p>
                </div>
            </div>
        </div>
        <iframe width={"200"} height={"113"} className={"media-oembed-content"} loading={"lazy"} title={"Hoe moedigt Femma deelnemers aan om (terug) te komen?"} style={{display:"none"}} sandbox={"allow-popups allow-top-navigation-by-user-activation"} src="/frames/c6445221-ca85-4257-bfc6-abd3ec00f6fc/index.html">
        </iframe>
    </div>
}


export default MediaEmbed
