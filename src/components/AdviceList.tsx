import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


        type AdviceListData = {
            items: React.ReactNode[];
        };
    
// Component

        function AdviceList({ dataId }: { dataId: string }) {
            const { items }: AdviceListData = getAdviceListData(dataId);

            return (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
        }
    


        function getAdviceListData(id: string): AdviceListData {
            const dataId = String(id);

            const data: Record<string, AdviceListData> = {
                "0": {
                    items: [
                        <>
                            {`Hou je inschrijvingsformulier zo `}
                            <strong>
                                kort
                            </strong>
                            {` en duidelijk mogelijk. `}
                        </>,
                        <>
                            {`Maak een korte `}
                            <strong>
                                handleiding
                            </strong>
                            {`. Vermeld stap voor stap hoe je het formulier invult. Gebruik duidelijke taal en beelden zodat ook mensen die nog niet zo goed Nederlands spreken het begrijpen. Met de tool Schrijf Simpel kan je snel jouw tekst in duidelijke taal omzetten. `}
                        </>,
                        <>
                            {`Vult de deelnemer niet alles in of gaat er iets fout? Voorzie een `}
                            <strong>
                                duidelijke melding
                            </strong>
                            . Zo weet de deelnemer wat te doen om toch succesvol in te schrijven.
                        </>,
                        <>
                            {`Vermeld een `}
                            <strong>
                                contactpersoon
                            </strong>
                            , e-mailadres en telefoonnummer van jouw organisatie. Als mensen vragen hebben, kunnen ze die persoon mailen of whatsappen.
                        </>
                    ]
                },
                "1": {
                    items: [
                        <>
                            <strong>
                                {`Wanneer? `}
                            </strong>
                            {`Richt één of meerdere inschrijfmomenten in. Noteer deze data op je flyers en in andere communicatie. `}
                        </>,
                        <>
                            <strong>
                                {`Waar? `}
                            </strong>
                            Laat de inschrijving doorgaan waar ook de activiteiten zelf plaatsvinden. Dan voelen nieuwe deelnemers zich al wat meer vertrouwd als ze voor het eerst naar de activiteit komen.
                        </>,
                        <>
                            <strong>
                                {`Aanspreekpunten aanstellen. `}
                            </strong>
                            {`Het is fijn als er één of meerdere aanspreekpunten zijn. Maak hen kenbaar door ze bijvoorbeeld een sticker of jas van de organisatie te geven. Idealiter komt deze persoon ook naar een eerste activiteit, zodat nieuwe deelnemers een vertrouwd gezicht zien. `}
                        </>,
                        <>
                            <strong>
                                {`Organisatieafspraken meegeven. `}
                            </strong>
                            Noteer alle afspraken over de organisatie en activiteiten zelf. Doe dat op papier, via e-mail en/of via whatsapp. Zo kan iedereen die rustig thuis bekijken, eventueel met de hulp van een ondersteuner of een vertaalapp. Gebruik de sjablonen en voorbeeldbrieven als inspiratie.
                        </>
                    ]
                },
                "2": {
                    items: [
                        <>
                            {`Begin en eindig gesprekken altijd in het Nederlands. `}
                        </>,
                        <>
                            Een taal oefenen gebeurt best in een positieve omgeving: laat iedereen weten dat het niet erg is als ze iets niet begrijpen of fouten maken.
                        </>,
                        <>
                            {`Spreek net iets langzamer en duidelijker dan je gewoon bent, maar overdrijf niet. Dat maakt het makkelijker, maar zal voor Nederlandstaligen ook niet raar aanvoelen. `}
                        </>,
                        <>
                            Gebruik je handen, gezichtsuitdrukkingen en voorwerpen. Doe een beweging voor terwijl je ook vertelt wat je aan het doen bent.
                        </>,
                        <>
                            Geef je een uitleg en heb je het gevoel dat iemand het niet begrijpt? Voor veel mensen is het lastig om toe te geven dat ze iets niet begrijpen, vooral in een groep of met nieuwe gezichten. In een groep kan je beter wachten op een rustig één-op-éénmoment om dingen opnieuw uit te leggen. Probeer je boodschap anders te formuleren.
                        </>
                    ]
                }
            };

            return data[dataId] ?? { items: [] };
        }
    

export default AdviceList
