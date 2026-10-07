import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


        type NavigationLinkData = {
            label: string;
            route?: string;
        };
    
// Component

        function NavigationLink({
            dataId
        }: {
            dataId: string;
        }) {
            const { label, route }: NavigationLinkData = getNavigationLinkData(dataId);

            if (route !== undefined) {
                return (
                    <a data-navigate-routes={JSON.stringify([route])}>
                        <span>
                            {label}
                        </span>
                    </a>
                );
            }

            return (
                <a>
                    <span>
                        {label}
                    </span>
                </a>
            );
        }
    

function getNavigationLinkData(id): NavigationLinkData  {
    switch (String(id)) {
    case "0":
        return ({
                  "label": "Home",
                  "route": "/"
                });
    case "1":
        return ({
                  "label": "Tools",
                  "route": "/tools"
                });
    case "2":
        return ({
                  "label": "Inspiratie",
                  "route": "/inspiratie"
                });
    case "3":
        return ({
                    "label": "Zoek",
                    "route": undefined
                });
    case "4":
        return ({
                    "label": "Promotie en werving",
                    "route": undefined
                });
    case "5":
        return ({
                    "label": "Inschrijving",
                    "route": "/themas/inschrijving"
                });
    case "6":
        return ({
                    "label": "De eerste keren",
                    "route": undefined
                });
    case "7":
        return ({
                    "label": "Betrokken deelname",
                    "route": undefined
                });
    case "8":
        return ({
                    "label": "Contact",
                    "route": undefined
                });
    case "9":
        return ({
                    "label": "Over ons",
                    "route": undefined
                });
    case "10":
        return ({
                    "label": "Disclaimer",
                    "route": undefined
                });
    case "11":
        return ({
                    "label": "Toegankelijkheidsverklaring",
                    "route": undefined
                });
    case "12":
        return ({
                  "label": "Takenblad voor vrijwilligers",
                  "route": undefined
                });
    case "13":
        return ({
                  "label": "Sjabloon: vrijwilligersfiche",
                  "route": undefined
                });
    case "14":
        return ({
                  "label": "Quiz: een warm welkom",
                  "route": undefined
                });
    case "15":
        return ({
                  "label": "App: Sportned",
                  "route": undefined
                });
    case "16":
        return ({
                  "label": "Tips: duidelijke taal in gesprekken",
                  "route": undefined
                });
    case "17":
        return ({
                  "label": "Sjabloon: organisatieafspraken",
                  "route": undefined
                });
    case "18":
        return ({
                    "label": "Voorbeeldbrief: inschrijving",
                    "route": undefined
                });
    case "19":
        return ({
                    "label": "Acties: voor een warm welkom",
                    "route": undefined
                });
    case "20":
        return ({
                    "label": "Checklist: hoe organiseer je de inschrijving in een sportclub?",
                    "route": undefined
                });
    case "21":
        return ({
                  "label": "De UiTPAS",
                  "route": undefined
                });
    case "22":
        return ({
                  "label": "Taaliconen",
                  "route": undefined
                });
    case "23":
        return ({
                  "label": "Microlearning: hoe maak je een begrijpelijke flyer?",
                  "route": undefined
                });
    case "24":
        return ({
                  "label": "Voorbeeldflyer: promotie voor jouw activiteit",
                  "route": undefined
                });
    case "25":
        return ({
                  "label": "Website: ikdoemee.be",
                  "route": undefined
                });
    case "26":
        return ({
                  "label": "Schrijf Simpel",
                  "route": undefined
                });
    case "27":
        return ({
                    "label": "Tools",
                    "route": "/tools?step=2"
                });
    case "28":
        return ({
                    "label": "Home",
                    "route": "/?step=2"
                });
    default:
        return ({
                  "label": "Home",
                  "route": "/"
                });
    }
}


export default NavigationLink
