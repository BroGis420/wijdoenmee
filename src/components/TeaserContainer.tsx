import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Img from './Img.tsx'
import NavigationLink from './NavigationLink.tsx'
import InspirationLink from './InspirationLink.tsx'
import Teaser from './Teaser.tsx'


        type TeaserContainerData = {
            wrapItemsInViewsRow: boolean;
            items: Array<{
                imageId: string;
                title: React.ReactNode;
                description: React.ReactNode;
                source?: React.ReactNode;
                theme: React.ReactNode;
            }>;
        };
    
// Component

        function TeaserContainer({
            dataId
        }: {
            dataId: string;
        }) {
            const { wrapItemsInViewsRow, items }: TeaserContainerData = getTeaserContainerData(dataId);

            return (
                <div className={"teaser__container teaser__container--3"}>
                    {items.map((item, index) =>
                        wrapItemsInViewsRow ? (
                            <div className={"views-row"} key={index}>
                                <TeaserItem
                                    imageId={item.imageId}
                                    title={item.title}
                                    description={item.description}
                                    source={item.source}
                                    theme={item.theme}
                                />
                            </div>
                        ) : (
                            <TeaserItem
                                key={index}
                                imageId={item.imageId}
                                title={item.title}
                                description={item.description}
                                source={item.source}
                                theme={item.theme}
                            />
                        )
                    )}
                </div>
            );
        }
    

// Subcomponents

        function TeaserItem({
            imageId,
            title,
            description,
            source,
            theme
        }: {
            imageId: string;
            title: React.ReactNode;
            description: React.ReactNode;
            source?: React.ReactNode;
            theme: React.ReactNode;
        }) {
            return (
                <div className={"teaser"}>
                    <div className={"teaser__img"}>
                        <Img id={imageId} />
                    </div>
                    <div className={"teaser__body"}>
                        <div>
                            <h2 className={"teaser__title"}>
                                {title}
                            </h2>
                            <p>
                                {description}
                            </p>
                            {source !== undefined && (
                                <p className={"teaser__tag source"}>
                                    {source}
                                </p>
                            )}
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
                </div>
            );
        }
    

function getTeaserContainerData(id): TeaserContainerData  {
    switch (String(id)) {
    case "0":
        return ({
                    "wrapItemsInViewsRow": true,
                    "items": [
                        {
                            "imageId": "4",
                            "title": <InspirationLink label="Hoe geef je fietscursussen aan volwassenen die nog niet goed Nederlands kunnen?" />,
                            "description": "Alles voortonen! Tonen en benoemen.",
                            "source": `
                                 Stad Brugge, Avansa `,
                            "theme": `
                                 Promotie en werving, De eerste keren `
                        },
                        {
                            "imageId": "5",
                            "title": <InspirationLink label="Hoe zorgt een visie van een sportclub ervoor dat mensen zich welkom voelen?" />,
                            "description": "Binnen de sportclub Ronin MMA vzw streven ze naar een samenwerking waar iedereen elkaar leert kennen. De visie van de club is dat sport een tool is om mensen met elkaar te leren omgaan. En om elkaars cultuur te leren begrijpen.",
                            "source": `
                                 Ronin MMA vzw `,
                            "theme": `
                                 Promotie en werving, Betrokken deelname `
                        },
                        {
                            "imageId": "6",
                            "title": <InspirationLink label="Hoe heeft wzc Klaverveld hun vrijwilligerspoule uitgebreid?" />,
                            "description": "Woonzorgcentrum Klaverveld in Zedelgem had al langer een grote poule van vrijwilligers. Maar hoe meer vrijwilligers, hoe meer bewoners kunnen genieten van een uitstap.",
                            "source": `
                                 Woonzorgcentrum Klaverveld `,
                            "theme": `
                                 Promotie en werving `
                        }
                    ]
                });
    case "1":
        return ({
                    "wrapItemsInViewsRow": false,
                    "items": [
                        {
                            "imageId": "5",
                            "title": <InspirationLink label="Hoe zorgt een visie van een sportclub ervoor dat mensen zich welkom voelen?" />,
                            "description": "Binnen de sportclub Ronin MMA vzw streven ze naar een samenwerking waar iedereen elkaar leert kennen. De visie van de club is dat sport een tool is om mensen met elkaar te leren omgaan. En om elkaars cultuur te leren begrijpen.",
                            "source": "Ronin MMA vzw ",
                            "theme": "Promotie en werving, Betrokken deelname "
                        },
                        {
                            "imageId": "35",
                            "title": <InspirationLink label="Hoe zet Residentie Christoff anderstalige vrijwilligers in?" />,
                            "description": "Eenzaamheid in een woonzorgcentrum doorbreken met een enthousiaste nieuwkomer?",
                            "source": "Residentie Christoff ",
                            "theme": "Promotie en werving, Betrokken deelname "
                        },
                        {
                            "imageId": "36",
                            "title": <InspirationLink label="Hoe versterken een buddy en een nieuwkomer elkaar in Torhout?" />,
                            "description": "HartEnBabbels is een plaatselijke vrijwilligersvereniging in Torhout. Sien van het buddyproject matchte Ali en Sara als duo.",
                            "source": "HartEnBabbels ",
                            "theme": "De eerste keren, Betrokken deelname "
                        }
                    ]
                });
    case "2":
        return ({
                  "wrapItemsInViewsRow": false,
                  "items": [
                    {
                      "imageId": "16",
                      "title": <NavigationLink dataId="18" />,
                      "description": "Hoe communiceer je wat jouw leden moeten doen bij de start van het seizoen of werkingsjaar? Gebruik dit voorbeeld van een inschrijvingsbrief.",
                      "source": undefined,
                      "theme": `
                             Inschrijving `
                    },
                    {
                      "imageId": "15",
                      "title": <NavigationLink dataId="17" />,
                      "description": "Ontwerp je eigen afsprakenblad. Geef het mee bij de inschrijving en hang het op in jullie lokalen.",
                      "source": undefined,
                      "theme": `
                             Inschrijving, De eerste keren `
                    },
                    {
                      "imageId": "18",
                      "title": <NavigationLink dataId="20" />,
                      "description": "De checklist helpt je om elke stap van aanmelding toegankelijk te maken.",
                      "source": undefined,
                      "theme": `
                             Inschrijving `
                    },
                    {
                      "imageId": "38",
                      "title": <NavigationLink dataId="26" />,
                      "description": `Zet jouw tekst snel om in een duidelijke tekst.\u00A0`,
                      "source": undefined,
                      "theme": `
                             Promotie en werving `
                    },
                    {
                      "imageId": "19",
                      "title": <NavigationLink dataId="21" />,
                      "description": "Schrijf je in om partner van het UITnetwerk te worden.",
                      "source": undefined,
                      "theme": `
                             Inschrijving `
                    }
                  ]
                });
    default:
        return ({
                    "wrapItemsInViewsRow": true,
                    "items": [
                        {
                            "imageId": "4",
                            "title": <InspirationLink label="Hoe geef je fietscursussen aan volwassenen die nog niet goed Nederlands kunnen?" />,
                            "description": "Alles voortonen! Tonen en benoemen.",
                            "source": `
                                 Stad Brugge, Avansa `,
                            "theme": `
                                 Promotie en werving, De eerste keren `
                        },
                        {
                            "imageId": "5",
                            "title": <InspirationLink label="Hoe zorgt een visie van een sportclub ervoor dat mensen zich welkom voelen?" />,
                            "description": "Binnen de sportclub Ronin MMA vzw streven ze naar een samenwerking waar iedereen elkaar leert kennen. De visie van de club is dat sport een tool is om mensen met elkaar te leren omgaan. En om elkaars cultuur te leren begrijpen.",
                            "source": `
                                 Ronin MMA vzw `,
                            "theme": `
                                 Promotie en werving, Betrokken deelname `
                        },
                        {
                            "imageId": "6",
                            "title": <InspirationLink label="Hoe heeft wzc Klaverveld hun vrijwilligerspoule uitgebreid?" />,
                            "description": "Woonzorgcentrum Klaverveld in Zedelgem had al langer een grote poule van vrijwilligers. Maar hoe meer vrijwilligers, hoe meer bewoners kunnen genieten van een uitstap.",
                            "source": `
                                 Woonzorgcentrum Klaverveld `,
                            "theme": `
                                 Promotie en werving `
                        }
                    ]
                });
    }
}


export default TeaserContainer
