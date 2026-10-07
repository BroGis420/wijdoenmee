import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import NavigationLink from './NavigationLink.tsx'
import FilterButton from './FilterButton.tsx'
import TagFilter from './TagFilter.tsx'
import SubmitInput from './SubmitInput.tsx'
import TeaserImage from './TeaserImage.tsx'
import Teaser from './Teaser.tsx'
import Pager from './Pager.tsx'


        type FilteredListingData = {
            sectionClassName: string;
            title: string;
            formSelector: string;
            formId: string;
            dataOnce?: string;
            tagFilterIds: string[];
            actionsId: string;
            submitSelector: string;
            submitId: string;
            teasers: Array<
                | {
                    kind: "tools";
                    imageId: string;
                    navigationDataId: string;
                    description: React.ReactNode;
                    tag: string;
                }
                | {
                    kind: "inspiration";
                    imageId: string;
                    teaserDataId: string;
                }
            >;
            pagerDataId: string;
        };
    
// Component

        function FilteredListing({
            dataId
        }: {
            dataId: string;
        }) {
            const data: FilteredListingData = getFilteredListingData(dataId);

            return (
                <div className={data.sectionClassName}>
                    <div className={"filter__results"}>
                        <div className={"filter__results__title"}>
                            <div className={"section__title"}>
                                <h1>
                                    {data.title}
                                </h1>
                            </div>
                            <div id={"filterToggleContainer"} className={"is-closed"}>
                                <FilterButton />
                            </div>
                        </div>
                    </div>
                    <div className={"layout-with-sidebar layout-with-sidebar--closed"}>
                        <div className={"layout-with-sidebar__sidebar"} style={{display:"none"}}>
                            <div className={"tags__container"}>
                                <form
                                    className={"views-exposed-form bef-exposed-form"}
                                    noValidate={""}
                                    data-drupal-selector={data.formSelector}
                                    id={data.formId}
                                    acceptCharset={"UTF-8"}
                                    {...(data.dataOnce === undefined ? {} : {"data-once": data.dataOnce})}
                                >
                                    {data.tagFilterIds.map((tagFilterId) => (
                                        <TagFilter key={tagFilterId} dataId={tagFilterId} />
                                    ))}
                                    <div
                                        data-drupal-selector={"edit-actions"}
                                        className={"form-actions js-form-wrapper form-wrapper"}
                                        id={data.actionsId}
                                    >
                                        <SubmitInput
                                            selector={data.submitSelector}
                                            id={data.submitId}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={"layout-with-sidebar__content"}>
                            <div className={"teaser__container teaser__container--3"}>
                                {data.teasers.map((teaser, index) => (
                                    <ListingTeaser key={index} teaser={teaser} />
                                ))}
                            </div>
                            <div className={"pagination"}>
                                <Pager dataId={data.pagerDataId} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    

// Subcomponents

        function ListingTeaser({
            teaser
        }: {
            teaser: FilteredListingData["teasers"][number];
        }) {
            if (teaser.kind === "inspiration") {
                return (
                    <div className={"teaser"}>
                        <TeaserImage imgId={teaser.imageId} />
                        <Teaser dataId={teaser.teaserDataId} />
                    </div>
                );
            }

            return (
                <div className={"teaser"}>
                    <TeaserImage imgId={teaser.imageId} />
                    <div className={"teaser__body"}>
                        <div>
                            <h2 className={"teaser__title"}>
                                <NavigationLink dataId={teaser.navigationDataId} />
                            </h2>
                            <p>
                                {teaser.description}
                            </p>
                            <p className={"teaser__tag theme"}>
                                {`
                                     ${teaser.tag} `}
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
    

function getFilteredListingData(id): FilteredListingData  {
    switch (String(id)) {
    case "0":
        return ({
                    "sectionClassName": "section section--tools",
                    "title": "Tools",
                    "formSelector": "views-exposed-form-tools-page-1",
                    "formId": "views-exposed-form-tools-page-1",
                    "dataOnce": undefined,
                    "tagFilterIds": ["0", "1"],
                    "actionsId": "edit-actions--2",
                    "submitSelector": "edit-submit-tools-2",
                    "submitId": "edit-submit-tools--2",
                    "teasers": [
                        {
                            "kind": "tools",
                            "imageId": "10",
                            "navigationDataId": "12",
                            "description": "In een takenblad maak je een opsomming van alle mogelijke taken die deelnemers vrijwillig kunnen doen in jouw organisatie.",
                            "tag": "Betrokken deelname"
                        },
                        {
                            "kind": "tools",
                            "imageId": "11",
                            "navigationDataId": "13",
                            "description": "Met een vrijwilligersfiche zie je hoeveel tijd iemand wil vrijmaken en welke taken daarbij passen. Gebruik het sjabloon om duidelijk te krijgen wat jouw deelnemers zien zitten om te doen.",
                            "tag": "Betrokken deelname"
                        },
                        {
                            "kind": "tools",
                            "imageId": "12",
                            "navigationDataId": "14",
                            "description": "Weet jij hoe je anderstalige nieuwkomers kan verwelkomen op je activiteit? Doe de sneltest.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "13",
                            "navigationDataId": "15",
                            "description": "De app SportNed helpt sportbegeleiders, sporters en sportouders om functioneel Nederlands te leren en oefenen in de context van sport.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "14",
                            "navigationDataId": "16",
                            "description": "Hoe spreek je Nederlands met mensen die de taal nog leren? Download de flyer.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "15",
                            "navigationDataId": "17",
                            "description": "Ontwerp je eigen afsprakenblad. Geef het mee bij de inschrijving en hang het op in jullie lokalen.",
                            "tag": "Inschrijving, De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "16",
                            "navigationDataId": "18",
                            "description": "Hoe communiceer je wat jouw leden moeten doen bij de start van het seizoen of werkingsjaar? Gebruik dit voorbeeld van een inschrijvingsbrief.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "17",
                            "navigationDataId": "19",
                            "description": "Met deze drie eenvoudige acties zorg je ervoor dat iedereen zich welkom voelt.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "18",
                            "navigationDataId": "20",
                            "description": "De checklist helpt je om elke stap van aanmelding toegankelijk te maken.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "19",
                            "navigationDataId": "21",
                            "description": "Schrijf je in om partner van het UITnetwerk te worden.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "20",
                            "navigationDataId": "22",
                            "description": "Wat zijn taaliconen? En hoe kan je ze gebruiken in jouw organisatie?",
                            "tag": "Promotie en werving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "21",
                            "navigationDataId": "23",
                            "description": "Wat komt er best wel en niet op je flyer? Welke beelden zijn geschikt? Ontdek het stap voor stap in de e-learning.",
                            "tag": "Promotie en werving"
                        }
                    ],
                    "pagerDataId": "0"
                });
    case "1":
        return ({
                    "sectionClassName": "section section--tools",
                    "title": "Tools",
                    "formSelector": "views-exposed-form-tools-page-1",
                    "formId": "views-exposed-form-tools-page-1",
                    "dataOnce": "bef-auto-submit befSingleCheckboxFix exposed-form",
                    "tagFilterIds": ["2", "3"],
                    "actionsId": "edit-actions--Ajx0-v-bY3M",
                    "submitSelector": "edit-submit-tools-xgh-ikzh7l8",
                    "submitId": "edit-submit-tools--xgH-iKZh7L8",
                    "teasers": [
                        {
                            "kind": "tools",
                            "imageId": "22",
                            "navigationDataId": "24",
                            "description": "Via de voorbeeldflyer zie je de belangrijke elementen van een begrijpelijke communicatie. Gebruik de instructies om er zelf een te maken.",
                            "tag": "Promotie en werving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "23",
                            "navigationDataId": "25",
                            "description": "Registreer jouw activiteit op ikdoemee.be: een meertalige databank met activiteiten die toegankelijk zijn voor nieuwkomers en anderstaligen.",
                            "tag": "Promotie en werving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "24",
                            "navigationDataId": "26",
                            "description": "Zet jouw tekst snel om in een duidelijke tekst.\u00A0",
                            "tag": "Promotie en werving"
                        }
                    ],
                    "pagerDataId": "1"
                });
    case "2":
        return ({
                    "sectionClassName": "section section--inspirations",
                    "title": "Inspiratie",
                    "formSelector": "views-exposed-form-inspirations-page-1",
                    "formId": "views-exposed-form-inspirations-page-1",
                    "dataOnce": undefined,
                    "tagFilterIds": ["4", "5", "6"],
                    "actionsId": "edit-actions--2",
                    "submitSelector": "edit-submit-inspirations-2",
                    "submitId": "edit-submit-inspirations--2",
                    "teasers": [
                        { "kind": "inspiration", "imageId": "25", "teaserDataId": "0" },
                        { "kind": "inspiration", "imageId": "26", "teaserDataId": "1" },
                        { "kind": "inspiration", "imageId": "6", "teaserDataId": "2" },
                        { "kind": "inspiration", "imageId": "27", "teaserDataId": "3" },
                        { "kind": "inspiration", "imageId": "28", "teaserDataId": "4" },
                        { "kind": "inspiration", "imageId": "4", "teaserDataId": "5" },
                        { "kind": "inspiration", "imageId": "29", "teaserDataId": "6" },
                        { "kind": "inspiration", "imageId": "30", "teaserDataId": "7" },
                        { "kind": "inspiration", "imageId": "31", "teaserDataId": "8" },
                        { "kind": "inspiration", "imageId": "32", "teaserDataId": "9" },
                        { "kind": "inspiration", "imageId": "33", "teaserDataId": "10" },
                        { "kind": "inspiration", "imageId": "5", "teaserDataId": "11" }
                    ],
                    "pagerDataId": "2"
                });
    case "3":
        return ({
                    "sectionClassName": "section section--tools",
                    "title": "Tools",
                    "formSelector": "views-exposed-form-tools-page-1",
                    "formId": "views-exposed-form-tools-page-1",
                    "dataOnce": undefined,
                    "tagFilterIds": ["0", "1"],
                    "actionsId": "edit-actions--2",
                    "submitSelector": "edit-submit-tools-2",
                    "submitId": "edit-submit-tools--2",
                    "teasers": [
                        {
                            "kind": "tools",
                            "imageId": "10",
                            "navigationDataId": "12",
                            "description": "In een takenblad maak je een opsomming van alle mogelijke taken die deelnemers vrijwillig kunnen doen in jouw organisatie.",
                            "tag": "Betrokken deelname"
                        },
                        {
                            "kind": "tools",
                            "imageId": "11",
                            "navigationDataId": "13",
                            "description": "Met een vrijwilligersfiche zie je hoeveel tijd iemand wil vrijmaken en welke taken daarbij passen. Gebruik het sjabloon om duidelijk te krijgen wat jouw deelnemers zien zitten om te doen.",
                            "tag": "Betrokken deelname"
                        },
                        {
                            "kind": "tools",
                            "imageId": "12",
                            "navigationDataId": "14",
                            "description": "Weet jij hoe je anderstalige nieuwkomers kan verwelkomen op je activiteit? Doe de sneltest.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "13",
                            "navigationDataId": "15",
                            "description": "De app SportNed helpt sportbegeleiders, sporters en sportouders om functioneel Nederlands te leren en oefenen in de context van sport.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "14",
                            "navigationDataId": "16",
                            "description": "Hoe spreek je Nederlands met mensen die de taal nog leren? Download de flyer.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "15",
                            "navigationDataId": "17",
                            "description": "Ontwerp je eigen afsprakenblad. Geef het mee bij de inschrijving en hang het op in jullie lokalen.",
                            "tag": "Inschrijving, De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "16",
                            "navigationDataId": "18",
                            "description": "Hoe communiceer je wat jouw leden moeten doen bij de start van het seizoen of werkingsjaar? Gebruik dit voorbeeld van een inschrijvingsbrief.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "17",
                            "navigationDataId": "19",
                            "description": "Met deze drie eenvoudige acties zorg je ervoor dat iedereen zich welkom voelt.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "18",
                            "navigationDataId": "20",
                            "description": "De checklist helpt je om elke stap van aanmelding toegankelijk te maken.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "19",
                            "navigationDataId": "21",
                            "description": "Schrijf je in om partner van het UITnetwerk te worden.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "20",
                            "navigationDataId": "22",
                            "description": "Wat zijn taaliconen? En hoe kan je ze gebruiken in jouw organisatie?",
                            "tag": "Promotie en werving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "21",
                            "navigationDataId": "23",
                            "description": "Wat komt er best wel en niet op je flyer? Welke beelden zijn geschikt? Ontdek het stap voor stap in de e-learning.",
                            "tag": "Promotie en werving"
                        }
                    ],
                    "pagerDataId": "2"
                });
    default:
        return ({
                    "sectionClassName": "section section--tools",
                    "title": "Tools",
                    "formSelector": "views-exposed-form-tools-page-1",
                    "formId": "views-exposed-form-tools-page-1",
                    "dataOnce": undefined,
                    "tagFilterIds": ["0", "1"],
                    "actionsId": "edit-actions--2",
                    "submitSelector": "edit-submit-tools-2",
                    "submitId": "edit-submit-tools--2",
                    "teasers": [
                        {
                            "kind": "tools",
                            "imageId": "10",
                            "navigationDataId": "12",
                            "description": "In een takenblad maak je een opsomming van alle mogelijke taken die deelnemers vrijwillig kunnen doen in jouw organisatie.",
                            "tag": "Betrokken deelname"
                        },
                        {
                            "kind": "tools",
                            "imageId": "11",
                            "navigationDataId": "13",
                            "description": "Met een vrijwilligersfiche zie je hoeveel tijd iemand wil vrijmaken en welke taken daarbij passen. Gebruik het sjabloon om duidelijk te krijgen wat jouw deelnemers zien zitten om te doen.",
                            "tag": "Betrokken deelname"
                        },
                        {
                            "kind": "tools",
                            "imageId": "12",
                            "navigationDataId": "14",
                            "description": "Weet jij hoe je anderstalige nieuwkomers kan verwelkomen op je activiteit? Doe de sneltest.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "13",
                            "navigationDataId": "15",
                            "description": "De app SportNed helpt sportbegeleiders, sporters en sportouders om functioneel Nederlands te leren en oefenen in de context van sport.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "14",
                            "navigationDataId": "16",
                            "description": "Hoe spreek je Nederlands met mensen die de taal nog leren? Download de flyer.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "15",
                            "navigationDataId": "17",
                            "description": "Ontwerp je eigen afsprakenblad. Geef het mee bij de inschrijving en hang het op in jullie lokalen.",
                            "tag": "Inschrijving, De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "16",
                            "navigationDataId": "18",
                            "description": "Hoe communiceer je wat jouw leden moeten doen bij de start van het seizoen of werkingsjaar? Gebruik dit voorbeeld van een inschrijvingsbrief.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "17",
                            "navigationDataId": "19",
                            "description": "Met deze drie eenvoudige acties zorg je ervoor dat iedereen zich welkom voelt.",
                            "tag": "De eerste keren"
                        },
                        {
                            "kind": "tools",
                            "imageId": "18",
                            "navigationDataId": "20",
                            "description": "De checklist helpt je om elke stap van aanmelding toegankelijk te maken.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "19",
                            "navigationDataId": "21",
                            "description": "Schrijf je in om partner van het UITnetwerk te worden.",
                            "tag": "Inschrijving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "20",
                            "navigationDataId": "22",
                            "description": "Wat zijn taaliconen? En hoe kan je ze gebruiken in jouw organisatie?",
                            "tag": "Promotie en werving"
                        },
                        {
                            "kind": "tools",
                            "imageId": "21",
                            "navigationDataId": "23",
                            "description": "Wat komt er best wel en niet op je flyer? Welke beelden zijn geschikt? Ontdek het stap voor stap in de e-learning.",
                            "tag": "Promotie en werving"
                        }
                    ],
                    "pagerDataId": "0"
                });
    }
}


export default FilteredListing
