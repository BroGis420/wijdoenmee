import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Img from './Img.tsx'


        type PartnerLinkData = {
            title: string;
            className: string;
            label: string;
            imageId: string;
        };
    
// Component

        function PartnerLink({ dataId }: { dataId: string }) {
            const { title, className, label, imageId }: PartnerLinkData = getPartnerLinkData(dataId);

            return (
                <a
                    title={title}
                    className={className}
                    data-navigate-routes={JSON.stringify(["/themas/inschrijving"])}
                >
                    <span>
                        {label}
                    </span>
                    <Img id={imageId} />
                </a>
            );
        }
    


        function getPartnerLinkData(id: string): PartnerLinkData {
            const stringId = String(id);

            switch (stringId) {
                case "0":
                    return {
                        title: "Stad Brugge",
                        className: "partner-brugge",
                        label: "Stad Brugge",
                        imageId: "7"
                    };
                case "1":
                    return {
                        title: "Agentschap Integratie en Inburgering",
                        className: "partner-agii",
                        label: "AgII",
                        imageId: "8"
                    };
                case "2":
                    return {
                        title: "Vlaanderen is divers",
                        className: "partner-vlaanderen",
                        label: "Vlaanderen is divers",
                        imageId: "9"
                    };
                default:
                    return {
                        title: "Stad Brugge",
                        className: "partner-brugge",
                        label: "Stad Brugge",
                        imageId: "7"
                    };
            }
        }
    

export default PartnerLink
