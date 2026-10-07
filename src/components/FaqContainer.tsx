import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import LineBreak from './LineBreak.tsx'
import ParticipationList from './ParticipationList.tsx'
import AdviceList from './AdviceList.tsx'
import PromotieLink from './PromotieLink.tsx'


        type FaqContainerData = {
            items: Array<{
                summary: React.ReactNode;
                navigateRoutes?: string[];
                content: React.ReactNode;
            }>;
        };
    
// Component

        function FaqContainer({
            dataId,
            firstOpen = false
        }: {
            dataId: string;
            firstOpen?: boolean;
        }) {
            const { items }: FaqContainerData = getFaqContainerData(dataId);

            return (
                <div className={"faq__container"}>
                    {items.map((item, index) => (
                        <FaqItem
                            key={index}
                            summary={item.summary}
                            navigateRoutes={item.navigateRoutes}
                            content={item.content}
                            open={index === 0 && firstOpen}
                        />
                    ))}
                </div>
            );
        }
    

// Subcomponents

        function FaqItem({
            summary,
            navigateRoutes,
            content,
            open
        }: {
            summary: React.ReactNode;
            navigateRoutes?: string[];
            content: React.ReactNode;
            open: boolean;
        }) {
            return (
                <div className={"faq__item"}>
                    <details {...(open ? { open: "" } : {})}>
                        {navigateRoutes ? (
                            <summary data-navigate-routes={JSON.stringify(navigateRoutes)}>
                                {summary}
                            </summary>
                        ) : (
                            <summary>
                                {summary}
                            </summary>
                        )}
                        <div className={"faq__content"}>
                            <div className={"block block__text"}>
                                {content}
                            </div>
                        </div>
                    </details>
                </div>
            );
        }
    

function getFaqContainerData(id): FaqContainerData  {
    switch (String(id)) {
    case "0":
        return ({
                    "items": [
                        {
                            "summary": <>{"Hoe motiveer je deelnemers om te blijven komen? "}</>,
                            "navigateRoutes": ["/inspiratie/hoe-moedigt-femma-deelnemers-aan-om-terug-te-komen?step=2"],
                            "content": (
                                <>
                                    <p>
                                        Nieuwe leden haken soms af zonder dat je weet waarom. Vaak heeft het niets te maken met je organisatie, maar verwachtte de deelnemer iets anders. Of misschien zijn er organisatorische uitdagingen, zoals de bereikbaarheid van de locatie of het tijdstip van de activiteit.
                                    </p>
                                    <h2>Vraag door</h2>
                                    <p>
                                        <strong>{"Vraag waarom iemand wel of niet terugkomt. "}</strong>
                                        Dat getuigt van oprechte interesse en geeft waardevolle inzichten.
                                        <LineBreak />
                                        Investeer in persoonlijk contact: een buddy of een aanspreekpunt die na de activiteit nog eens contact opneemt, zorgt voor extra verbinding.
                                    </p>
                                    <h2>Hou het contact warm</h2>
                                    <p>
                                        {"Een groot engagement, zoals meteen voor een heel jaar inschrijven, kan afschrikken. Laat daarom altijd de deur op een kier staan: misschien past het nu niet, maar over een paar maanden wel. "}
                                        <strong>{"Stuur af en toe een berichtje "}</strong>
                                        over nieuwe activiteiten of nodig voormalige deelnemers uit voor een gezellig zomerfeestje. Whatsapp is de meest toegankelijke manier om te communiceren, ook voor mensen die minder digitaalvaardig zijn.
                                    </p>
                                    <h2>Zorg voor een aanspreekpunt</h2>
                                    <p>
                                        Het aanspreekpunt is de trainer, de begeleider van de activiteit of iemand helemaal anders. Deelnemers kunnen bij het aanspreekpunt:
                                    </p>
                                    <ParticipationList />
                                </>
                            )
                        }
                    ]
                });
    case "1":
        return ({
                    "items": [
                        {
                            "summary": <>{"Hoe motiveer je deelnemers om te blijven komen? "}</>,
                            "navigateRoutes": ["/inspiratie/hoe-moedigt-femma-deelnemers-aan-om-terug-te-komen?step=2"],
                            "content": (
                                <>
                                    <p>
                                        Nieuwe leden haken soms af zonder dat je weet waarom. Vaak heeft het niets te maken met je organisatie, maar verwachtte de deelnemer iets anders. Of misschien zijn er organisatorische uitdagingen, zoals de bereikbaarheid van de locatie of het tijdstip van de activiteit.
                                    </p>
                                    <h2>Vraag door</h2>
                                    <p>
                                        <strong>{"Vraag waarom iemand wel of niet terugkomt. "}</strong>
                                        Dat getuigt van oprechte interesse en geeft waardevolle inzichten.
                                        <LineBreak />
                                        Investeer in persoonlijk contact: een buddy of een aanspreekpunt die na de activiteit nog eens contact opneemt, zorgt voor extra verbinding.
                                    </p>
                                    <h2>Hou het contact warm</h2>
                                    <p>
                                        {"Een groot engagement, zoals meteen voor een heel jaar inschrijven, kan afschrikken. Laat daarom altijd de deur op een kier staan: misschien past het nu niet, maar over een paar maanden wel. "}
                                        <strong>{"Stuur af en toe een berichtje "}</strong>
                                        over nieuwe activiteiten of nodig voormalige deelnemers uit voor een gezellig zomerfeestje. Whatsapp is de meest toegankelijke manier om te communiceren, ook voor mensen die minder digitaalvaardig zijn.
                                    </p>
                                    <h2>Zorg voor een aanspreekpunt</h2>
                                    <p>
                                        Het aanspreekpunt is de trainer, de begeleider van de activiteit of iemand helemaal anders. Deelnemers kunnen bij het aanspreekpunt:
                                    </p>
                                    <ParticipationList />
                                </>
                            )
                        }
                    ]
                });
    case "2":
        return ({
                    "items": [
                        {
                            "summary": "Hoe organiseer je de inschrijvingen?",
                            "navigateRoutes": ["/themas/inschrijving?step=2"],
                            "content": (
                                <>
                                    <p>
                                        Om zoveel mogelijk mensen te bereiken, zet je best in op een combinatie van een digitaal inschrijvingsformulier én een fysiek inschrijfmoment.
                                    </p>
                                    <h2>Digitaal formulier</h2>
                                    <AdviceList dataId="0" />
                                    <h2>Fysiek inschrijfmoment</h2>
                                    <p>
                                        Tijdens het fysieke inschrijfmoment kun je meteen persoonlijk uitleg geven over de werking en een rondleiding geven. Zo verlaag je de drempel en maak je de inschrijving voor iedereen toegankelijk.
                                    </p>
                                    <AdviceList dataId="1" />
                                    <h2>Kort op voorhand inschrijven</h2>
                                    <p>
                                        Voor veel mensen is het lastig om lang op voorhand te plannen: een cursus Nederlands valt op een ander moment, een nieuwe job of kinderen die van school veranderen, verhuizen ... Daarom is het handig als je niet te lang op voorhand moet inschrijven. Dan is de kans groter dat het in de agenda past en dat mensen effectief komen!
                                        <LineBreak />
                                        {" "}
                                    </p>
                                </>
                            )
                        },
                        {
                            "summary": "Waarom is de UiTPAS interessant?",
                            "navigateRoutes": undefined,
                            "content": (
                                <>
                                    <p>
                                        Met de UiTPAS bied je jouw activiteiten aan een voordeliger tarief aan voor mensen die recht hebben op een verhoogde tegemoetkoming.
                                    </p>
                                    <p>
                                        Deelnemers met een UiTPAS sparen punten bij elke activiteit. Ze kunnen deze inwisselen voor voordelen zoals korting, gadgets of gratis tickets. Als partner van de UiTPAS kies je zelf welke omruilvoordelen je aanbiedt.
                                    </p>
                                    <p>
                                        {"Bovendien verschijnen jouw werking en activiteiten op de website van UiT in Vlaanderen, hun nieuwsbrief en sociale media. Op deze manier bereik je een bredere doelgroep en laat je je sociaal engagement zien. "}
                                    </p>
                                </>
                            )
                        },
                        {
                            "summary": "Hoe kan je zonder inschrijving of met flexibele deelname werken?",
                            "navigateRoutes": undefined,
                            "content": (
                                <>
                                    <p>
                                        {"Hoe vrijblijvender een activiteit is, hoe toegankelijker. De situatie van anderstalige nieuwkomers maakt dat hun agenda soms veranderlijk is. Bijvoorbeeld door een nieuwe job met verschillende uren, de cursus Nederlands, kinderen die van school veranderen ... "}
                                        <strong>De vrijheid om gewoon te kunnen komen</strong>
                                        , kan mensen motiveren.
                                    </p>
                                    <p>
                                        De spontaniteit zorgt er ook voor dat er soms meer of minder mensen komen. Denk er dus goed over na of het een optie voor jullie is en of de infrastructuur het aankan. Is er genoeg materiaal voor een grotere groep mensen? Zijn er voldoende vrijwilligers om de activiteit te begeleiden?
                                    </p>
                                    <p>
                                        {"Als tussenoplossing kan je ook "}
                                        <strong>{"korte reeksen "}</strong>
                                        {"of een "}
                                        <strong>{"beurtenkaart "}</strong>
                                        aanbieden. Zo heb je meer planningszekerheid en toch voldoende flexibiliteit voor je deelnemers.
                                    </p>
                                    <p>
                                        {"Bied je in je organisatie enkel een jaarwerking aan? Bekijk dan of het misschien mogelijk is om bijvoorbeeld twee keer per jaar "}
                                        <PromotieLink />
                                        <strong>{" (initiaties)"}</strong>
                                        {" in te plannen. Zo leren mensen je werking echt kennen en kunnen ze makkelijker kiezen voor een langer engagement."}
                                    </p>
                                </>
                            )
                        },
                        {
                            "summary": "Kan je gewoon Nederlands blijven spreken?",
                            "navigateRoutes": undefined,
                            "content": (
                                <>
                                    <p>
                                        {"Voor mensen die Nederlands leren is het belangrijk om ook buiten de les te oefenen in alledaagse situaties. "}
                                    </p>
                                    <h2>
                                        Blijf daarom zo veel mogelijk Nederlands praten.
                                        <strong />
                                        Enkele tips:
                                    </h2>
                                    <AdviceList dataId="2" />
                                    <h2>Vertaalapps gebruiken</h2>
                                    <p>
                                        Lukt het even niet? Geen paniek, vertaalapps zijn tegenwoordig best handig. Maar let op, soms maken ze nog fouten, zeker bij minder courante talen. Check altijd bij de deelnemer of de vertaling goed is overgekomen.
                                    </p>
                                    <h2>Andere talen gebruiken</h2>
                                    <p>
                                        {"Het soepele verloop van de activiteit is prioritair! Soms kan het handig zijn om even een andere taal te gebruiken. Maak afspraken over wanneer je een ander taal gebruikt. Bijvoorbeeld in één-op-ééngesprekken of als je even bijpraat. Schakel nadien altijd terug over op het Nederlands. "}
                                        <LineBreak />
                                        {" "}
                                    </p>
                                </>
                            )
                        }
                    ]
                });
    case "3":
        return ({
                    "items": [
                        {
                            "summary": "Hoe organiseer je de inschrijvingen?",
                            "navigateRoutes": ["/themas/inschrijving?step=2"],
                            "content": (
                                <>
                                    <p>
                                        Om zoveel mogelijk mensen te bereiken, zet je best in op een combinatie van een digitaal inschrijvingsformulier én een fysiek inschrijfmoment.
                                    </p>
                                    <h2>
                                        Digitaal formulier
                                    </h2>
                                    <AdviceList dataId="0" />
                                    <h2>
                                        Fysiek inschrijfmoment
                                    </h2>
                                    <p>
                                        Tijdens het fysieke inschrijfmoment kun je meteen persoonlijk uitleg geven over de werking en een rondleiding geven. Zo verlaag je de drempel en maak je de inschrijving voor iedereen toegankelijk.
                                    </p>
                                    <AdviceList dataId="1" />
                                    <h2>
                                        Kort op voorhand inschrijven
                                    </h2>
                                    <p>
                                        Voor veel mensen is het lastig om lang op voorhand te plannen: een cursus Nederlands valt op een ander moment, een nieuwe job of kinderen die van school veranderen, verhuizen ... Daarom is het handig als je niet te lang op voorhand moet inschrijven. Dan is de kans groter dat het in de agenda past en dat mensen effectief komen!
                                        <LineBreak />
                                        {" "}
                                    </p>
                                </>
                            )
                        },
                        {
                            "summary": "Waarom is de UiTPAS interessant?",
                            "navigateRoutes": undefined,
                            "content": (
                                <>
                                    <p>
                                        Met de UiTPAS bied je jouw activiteiten aan een voordeliger tarief aan voor mensen die recht hebben op een verhoogde tegemoetkoming.
                                    </p>
                                    <p>
                                        Deelnemers met een UiTPAS sparen punten bij elke activiteit. Ze kunnen deze inwisselen voor voordelen zoals korting, gadgets of gratis tickets. Als partner van de UiTPAS kies je zelf welke omruilvoordelen je aanbiedt.
                                    </p>
                                    <p>
                                        {"Bovendien verschijnen jouw werking en activiteiten op de website van UiT in Vlaanderen, hun nieuwsbrief en sociale media. Op deze manier bereik je een bredere doelgroep en laat je je sociaal engagement zien. "}
                                    </p>
                                </>
                            )
                        },
                        {
                            "summary": "Hoe kan je zonder inschrijving of met flexibele deelname werken?",
                            "navigateRoutes": undefined,
                            "content": (
                                <>
                                    <p>
                                        {"Hoe vrijblijvender een activiteit is, hoe toegankelijker. De situatie van anderstalige nieuwkomers maakt dat hun agenda soms veranderlijk is. Bijvoorbeeld door een nieuwe job met verschillende uren, de cursus Nederlands, kinderen die van school veranderen ... "}
                                        <strong>
                                            De vrijheid om gewoon te kunnen komen
                                        </strong>
                                        , kan mensen motiveren.
                                    </p>
                                    <p>
                                        De spontaniteit zorgt er ook voor dat er soms meer of minder mensen komen. Denk er dus goed over na of het een optie voor jullie is en of de infrastructuur het aankan. Is er genoeg materiaal voor een grotere groep mensen? Zijn er voldoende vrijwilligers om de activiteit te begeleiden?
                                    </p>
                                    <p>
                                        {"Als tussenoplossing kan je ook "}
                                        <strong>
                                            {"korte reeksen "}
                                        </strong>
                                        {"of een "}
                                        <strong>
                                            {"beurtenkaart "}
                                        </strong>
                                        aanbieden. Zo heb je meer planningszekerheid en toch voldoende flexibiliteit voor je deelnemers.
                                    </p>
                                    <p>
                                        {"Bied je in je organisatie enkel een jaarwerking aan? Bekijk dan of het misschien mogelijk is om bijvoorbeeld twee keer per jaar "}
                                        <PromotieLink />
                                        <strong>
                                            {" (initiaties)"}
                                        </strong>
                                        {" in te plannen. Zo leren mensen je werking echt kennen en kunnen ze makkelijker kiezen voor een langer engagement."}
                                    </p>
                                </>
                            )
                        },
                        {
                            "summary": "Kan je gewoon Nederlands blijven spreken?",
                            "navigateRoutes": undefined,
                            "content": (
                                <>
                                    <p>
                                        {"Voor mensen die Nederlands leren is het belangrijk om ook buiten de les te oefenen in alledaagse situaties. "}
                                    </p>
                                    <h2>
                                        Blijf daarom zo veel mogelijk Nederlands praten.
                                        <strong>
                                        </strong>
                                        Enkele tips:
                                    </h2>
                                    <AdviceList dataId="2" />
                                    <h2>
                                        Vertaalapps gebruiken
                                    </h2>
                                    <p>
                                        Lukt het even niet? Geen paniek, vertaalapps zijn tegenwoordig best handig. Maar let op, soms maken ze nog fouten, zeker bij minder courante talen. Check altijd bij de deelnemer of de vertaling goed is overgekomen.
                                    </p>
                                    <h2>
                                        Andere talen gebruiken
                                    </h2>
                                    <p>
                                        {"Het soepele verloop van de activiteit is prioritair! Soms kan het handig zijn om even een andere taal te gebruiken. Maak afspraken over wanneer je een ander taal gebruikt. Bijvoorbeeld in één-op-ééngesprekken of als je even bijpraat. Schakel nadien altijd terug over op het Nederlands. "}
                                        <LineBreak />
                                        {" "}
                                    </p>
                                </>
                            )
                        }
                    ]
                });
    default:
        return ({
                    "items": [
                        {
                            "summary": <>{"Hoe motiveer je deelnemers om te blijven komen? "}</>,
                            "navigateRoutes": ["/inspiratie/hoe-moedigt-femma-deelnemers-aan-om-terug-te-komen?step=2"],
                            "content": (
                                <>
                                    <p>
                                        Nieuwe leden haken soms af zonder dat je weet waarom. Vaak heeft het niets te maken met je organisatie, maar verwachtte de deelnemer iets anders. Of misschien zijn er organisatorische uitdagingen, zoals de bereikbaarheid van de locatie of het tijdstip van de activiteit.
                                    </p>
                                    <h2>Vraag door</h2>
                                    <p>
                                        <strong>{"Vraag waarom iemand wel of niet terugkomt. "}</strong>
                                        Dat getuigt van oprechte interesse en geeft waardevolle inzichten.
                                        <LineBreak />
                                        Investeer in persoonlijk contact: een buddy of een aanspreekpunt die na de activiteit nog eens contact opneemt, zorgt voor extra verbinding.
                                    </p>
                                    <h2>Hou het contact warm</h2>
                                    <p>
                                        {"Een groot engagement, zoals meteen voor een heel jaar inschrijven, kan afschrikken. Laat daarom altijd de deur op een kier staan: misschien past het nu niet, maar over een paar maanden wel. "}
                                        <strong>{"Stuur af en toe een berichtje "}</strong>
                                        over nieuwe activiteiten of nodig voormalige deelnemers uit voor een gezellig zomerfeestje. Whatsapp is de meest toegankelijke manier om te communiceren, ook voor mensen die minder digitaalvaardig zijn.
                                    </p>
                                    <h2>Zorg voor een aanspreekpunt</h2>
                                    <p>
                                        Het aanspreekpunt is de trainer, de begeleider van de activiteit of iemand helemaal anders. Deelnemers kunnen bij het aanspreekpunt:
                                    </p>
                                    <ParticipationList />
                                </>
                            )
                        }
                    ]
                });
    }
}


export default FaqContainer
