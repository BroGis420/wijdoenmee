import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Img from './Img.tsx'


        type DeepdiveContainerData = {
            items: {
                imageId: string;
                title: string;
                description: string;
                trailingBreak: boolean;
                buttonLabel: string;
            }[];
        };
    
// Component

        function DeepdiveContainer({
            dataId
        }: {
            dataId: string;
        }) {
            const data: DeepdiveContainerData = getDeepdiveContainerData(dataId);

            return (
                <div className={"deepdive__container deepdive__container--3"}>
                    {data.items.map((item) => (
                        <DeepdiveItem
                            key={item.imageId}
                            imageId={item.imageId}
                            title={item.title}
                            description={item.description}
                            trailingBreak={item.trailingBreak}
                            buttonLabel={item.buttonLabel}
                        />
                    ))}
                </div>
            );
        }
    

// Subcomponents

        function DeepdiveItem({
            imageId,
            title,
            description,
            trailingBreak,
            buttonLabel
        }: {
            imageId: string;
            title: string;
            description: string;
            trailingBreak: boolean;
            buttonLabel: string;
        }) {
            return (
                <div className={"deepdive"}>
                    <div className={"deepdive__img"}>
                        <Img id={imageId} />
                    </div>
                    <div className={"deepdive__body"}>
                        <h3 className={"deepdive__title"}>
                            {title}
                        </h3>
                        <p>
                            {description}
                            {trailingBreak ? (
                                <>
                                    <br>
                                    </br>
                                    {` `}
                                </>
                            ) : null}
                        </p>
                        <a className={"deepdive__btn external button ext external-link"} target={"_blank"} rel={"noopener noreferrer"} title={"(opens in a new window)"}>
                            {buttonLabel}
                        </a>
                    </div>
                </div>
            );
        }
    


        function getDeepdiveContainerData(id: string): DeepdiveContainerData {
            const stringId = String(id);

            if (stringId === "0") {
                return {
                    items: [
                        {
                            imageId: "37",
                            title: "Inspiratiegids ‘werken met anderstalige vrijwilligers’",
                            description: `Werken jullie al met anderstalige vrijwilligers? Of willen jullie graag meer anderstalige nieuwkomers als vrijwilliger verwelkomen binnen jullie organisatie? Dan is deze inspiratiegids van FMDO iets voor jou! `,
                            trailingBreak: true,
                            buttonLabel: "Ga naar de inspiratiegids van FMDO"
                        }
                    ]
                };
            }

            if (stringId === "1") {
                return {
                    items: [
                        {
                            imageId: "39",
                            title: "Hoe toegankelijk is jouw vrijetijdsaanbod?",
                            description: `Ontdek hoe ver jullie al staan op het vlak van toegankelijkheid. En waar je nog mee aan de slag kunt. `,
                            trailingBreak: false,
                            buttonLabel: "Doe de test!"
                        },
                        {
                            imageId: "40",
                            title: "Volg een vorming",
                            description: "Wil je meer weten over duidelijke taal en toegankelijke vrije tijd?",
                            trailingBreak: false,
                            buttonLabel: "Bekijk de kalender met vormingen van AgII"
                        }
                    ]
                };
            }

            return {
                items: []
            };
        }
    

export default DeepdiveContainer
