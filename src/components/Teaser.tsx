import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


        type TeaserData = {
            title: string;
            description: string;
            source: string;
            theme: string;
            navigateRoutes?: string[];
        };
    
// Component

        function Teaser({
            dataId
        }: {
            dataId: string;
        }) {
            const {
                title,
                description,
                source,
                theme,
                navigateRoutes
            }: TeaserData = getTeaserData(dataId);

            return (
                <div className={"teaser__body"}>
                    <div>
                        <h2 className={"teaser__title"}>
                            <a {...(navigateRoutes !== undefined
                                ? { "data-navigate-routes": JSON.stringify(navigateRoutes) }
                                : {})}>
                                {title}
                            </a>
                        </h2>
                        <p>
                            {description}
                        </p>
                        <p className={"teaser__tag source"}>
                            {source}
                        </p>
                        <p className={"teaser__tag theme"}>
                            {theme}
                        </p>
                    </div>
                    <p className={"teaser__cta button button--primary"}>
                        {`
             Lees meer
             `}
                    </p>
                </div>
            );
        }
    

function getTeaserData(id): TeaserData  {
    switch (String(id)) {
    case "0":
        return ({
                  "title": "Hoe versterken een buddy en een nieuwkomer elkaar in Torhout?",
                  "description": "HartEnBabbels is een plaatselijke vrijwilligersvereniging in Torhout. Sien van het buddyproject matchte Ali en Sara als duo.",
                  "source": "\n             HartEnBabbels ",
                  "theme": "\n             De eerste keren, Betrokken deelname ",
                  "navigateRoutes": undefined
                });
    case "1":
        return ({
                    "title": "Hoe laat Beernem nieuwkomers een job vinden die past bij hun talenten?",
                    "description": "In Beernem begeleidt een jobcoach anderstalige nieuwkomers naar de arbeidsmarkt.",
                    "source": "\n             Huis van het Kind Beernem ",
                    "theme": "\n             Betrokken deelname ",
                    "navigateRoutes": undefined
                });
    case "2":
        return ({
                  "title": "Hoe heeft wzc Klaverveld hun vrijwilligerspoule uitgebreid?",
                  "description": "Woonzorgcentrum Klaverveld in Zedelgem had al langer een grote poule van vrijwilligers. Maar hoe meer vrijwilligers, hoe meer bewoners kunnen genieten van een uitstap.",
                  "source": "\n             Woonzorgcentrum Klaverveld ",
                  "theme": "\n             Promotie en werving ",
                  "navigateRoutes": undefined
                });
    case "3":
        return ({
                  "title": "Hoe maakt voetbalclub KSK Steenbrugge haar werking toegankelijk?",
                  "description": "Fada vertelt over zijn eerste training bij KSK Steenbrugge en hoe de club hem hielp om Nederlands te leren.",
                  "source": "\n             Voetbalclub KSK Steenbrugge ",
                  "theme": "\n             De eerste keren ",
                  "navigateRoutes": undefined
                });
    case "4":
        return ({
                    "title": "Hoe zet Residentie Christoff anderstalige vrijwilligers in?",
                    "description": "Eenzaamheid in een woonzorgcentrum doorbreken met een enthousiaste nieuwkomer?",
                    "source": "\n             Residentie Christoff ",
                    "theme": "\n             Promotie en werving, Betrokken deelname ",
                    "navigateRoutes": undefined
                });
    case "5":
        return ({
                  "title": "Hoe geef je fietscursussen aan volwassenen die nog niet goed Nederlands kunnen?",
                  "description": "Alles voortonen! Tonen en benoemen.",
                  "source": "\n             Stad Brugge, Avansa ",
                  "theme": "\n             Promotie en werving, De eerste keren ",
                  "navigateRoutes": undefined
                });
    case "6":
        return ({
                  "title": "Hoe zorgt het Concertgebouw ervoor dat mensen blijven deelnemen?",
                  "description": "Het Concertgebouw maakt aftermovies van projecten, waarmee ze nieuwe en bestaande deelnemers warm maken voor een volgend project.",
                  "source": "\n             Concertgebouw Brugge ",
                  "theme": "\n             Betrokken deelname ",
                  "navigateRoutes": undefined
                });
    case "7":
        return ({
                  "title": "Hoe vindt Li Li een nieuw publiek?",
                  "description": "Li Li Chong is participatie- en outreachmedewerker bij Concertgebouw Brugge. Zij gaat op zoek naar nieuw publiek voor hun activiteiten en mikt niet alleen op de ‘vaste klanten’. Hoe pakt zij het aan?",
                  "source": "\n             Concertgebouw Brugge ",
                  "theme": "\n             Promotie en werving ",
                  "navigateRoutes": undefined
                });
    case "8":
        return ({
                    "title": "Hoe maakt Compagnons toegankelijke flyers?",
                    "description": "Buddyproject Compagnons maakt flyers per doelgroep: één om potentiële vrijwilligers te werven en één voor anderstalige nieuwkomers.",
                    "source": "\n             FMDO ",
                    "theme": "\n             Promotie en werving ",
                    "navigateRoutes": undefined
                });
    case "9":
        return ({
                    "title": "Hoe organiseert Taranta vzw activiteiten samen met nieuwkomers?",
                    "description": "Op woonboot Taranta brengen ze mensen dichter bij elkaar via creatieve en culturele activiteiten.",
                    "source": "\n             Taranta vzw ",
                    "theme": "\n             Betrokken deelname, De eerste keren ",
                    "navigateRoutes": undefined
                });
    case "10":
        return ({
                  "title": "Hoe moedigt Femma deelnemers aan om (terug) te komen?",
                  "description": "Femma organiseert een naai-atelier in het buurtcentrum van Brugge. Omdat er veel anderstaligen in de buurt wonen, is het voor hen vanzelfsprekend dat ook zij welkom zijn op hun activiteiten. Al is het soms moeilijk om de vrouwen aan te moedigen om te (blijven) komen.",
                  "source": "\n             Femma Brugge Femmagique ",
                  "theme": "\n             Betrokken deelname ",
                  "navigateRoutes": ["/inspiratie/hoe-moedigt-femma-deelnemers-aan-om-terug-te-komen"]
                });
    case "11":
        return ({
                  "title": "Hoe zorgt een visie van een sportclub ervoor dat mensen zich welkom voelen?",
                  "description": "Binnen de sportclub Ronin MMA vzw streven ze naar een samenwerking waar iedereen elkaar leert kennen. De visie van de club is dat sport een tool is om mensen met elkaar te leren omgaan. En om elkaars cultuur te leren begrijpen.",
                  "source": "\n             Ronin MMA vzw ",
                  "theme": "\n             Promotie en werving, Betrokken deelname ",
                  "navigateRoutes": undefined
                });
    default:
        return ({
                  "title": "Hoe versterken een buddy en een nieuwkomer elkaar in Torhout?",
                  "description": "HartEnBabbels is een plaatselijke vrijwilligersvereniging in Torhout. Sien van het buddyproject matchte Ali en Sara als duo.",
                  "source": "\n             HartEnBabbels ",
                  "theme": "\n             De eerste keren, Betrokken deelname ",
                  "navigateRoutes": undefined
                });
    }
}


export default Teaser
