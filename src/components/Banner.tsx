import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


        type BannerData = {
            title: string;
            intro: React.ReactNode;
        };
    
// Component

        function Banner({ dataId }: { dataId: string }) {
            const { title, intro }: BannerData = getBannerData(dataId);
            return (
                <div className={"banner__body"}>
                    <h1 className={"banner__title"}>
                        {title}
                    </h1>
                    <div className={"banner__intro"}>
                        <p>
                            {intro}
                        </p>
                    </div>
                </div>
            );
        }
    


        function getBannerData(id: string): BannerData {
            const dataId = String(id);

            switch (dataId) {
                case "0":
                    return {
                        title: "Meer deelnemers voor jullie activiteiten?",
                        intro: (
                            <>
                                {`Laat anderstalige nieuwkomers makkelijk deelnemen aan jouw vrijetijdsactiviteiten. `}
                                <br>
                                </br>
                                Ontdek tips, tools en inspiratie over hoe anderen het aanpakken.
                            </>
                        ),
                    };
                case "1":
                    return {
                        title: "Hoe moedigt Femma deelnemers aan om (terug) te komen?",
                        intro: "Femma organiseert een naai-atelier in het buurtcentrum van Brugge. Omdat er veel anderstaligen in de buurt wonen, is het voor hen vanzelfsprekend dat ook zij welkom zijn op hun activiteiten. Al is het soms moeilijk om de vrouwen aan te moedigen om te (blijven) komen.",
                    };
                case "2":
                    return {
                        title: "Inschrijving",
                        intro: "Niet iedereen is handig met digitale tools of heeft voldoende kennis van het Nederlands. Organiseer daarom verschillende inschrijfmogelijkheden. Zo bereik je meer mensen, kiest iedereen wat best past en heet je mensen al vanaf de start welkom.",
                    };
                default:
                    return {
                        title: "",
                        intro: "",
                    };
            }
        }
    

export default Banner
