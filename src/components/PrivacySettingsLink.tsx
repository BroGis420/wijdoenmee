import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


// Component
function PrivacySettingsLink() {
    return <a title={"Open the Consent Management Dialog"} rel={"open-consent-manager"} data-navigate-routes={JSON.stringify(["/#"])}>
        Manage privacy settings
    </a>
}


export default PrivacySettingsLink
