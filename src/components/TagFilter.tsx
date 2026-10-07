import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


        type TagFilterData = {
            title: string;
            containerClassName: string;
            drupalSelector: string;
            containerId: string;
            dataOnce?: string;
            links: Array<{
                className: string;
                id: string;
                name: string;
                route: string;
                label: string;
            }>;
        };
    
// Component

        function TagFilter({
            dataId
        }: {
            dataId: string;
        }) {
            const {
                title,
                containerClassName,
                drupalSelector,
                containerId,
                dataOnce,
                links
            }: TagFilterData = getTagFilterData(dataId);

            const level = (
                <div className={"level"}>
                    {links.map((link) => (
                        <TagLink
                            key={link.id}
                            className={link.className}
                            id={link.id}
                            name={link.name}
                            route={link.route}
                            label={link.label}
                        />
                    ))}
                </div>
            );

            return (
                <div className={"tags"}>
                    <h2>
                        {title}
                    </h2>
                    {dataOnce === undefined ? (
                        <div
                            className={containerClassName}
                            data-drupal-selector={drupalSelector}
                            id={containerId}
                        >
                            {level}
                        </div>
                    ) : (
                        <div
                            className={containerClassName}
                            data-drupal-selector={drupalSelector}
                            id={containerId}
                            data-once={dataOnce}
                        >
                            {level}
                        </div>
                    )}
                </div>
            );
        }
    

// Subcomponents

        function TagLink({
            className,
            id,
            name,
            route,
            label
        }: {
            className: string;
            id: string;
            name: string;
            route: string;
            label: string;
        }) {
            return (
                <a
                    className={className}
                    id={id}
                    name={name}
                    data-navigate-routes={JSON.stringify([route])}
                >
                    {label}
                </a>
            );
        }
    

function getTagFilterData(id): TagFilterData  {
    switch (String(id)) {
    case "0":
        return ({
                  "title": "Activiteiten",
                  "containerClassName": "bef-links-use-ajax bef-links",
                  "drupalSelector": "edit-activiteiten",
                  "containerId": "edit-activiteiten--2",
                  "dataOnce": undefined,
                  "links": [
                    {
                      "className": "bef-link edit-activiteiten--3",
                      "id": "edit-activiteiten-16",
                      "name": "activiteiten[16]",
                      "route": "/tools",
                      "label": "Buurtactiviteit"
                    },
                    {
                      "className": "bef-link edit-activiteiten--4",
                      "id": "edit-activiteiten-4",
                      "name": "activiteiten[4]",
                      "route": "/tools",
                      "label": "Creativiteit"
                    },
                    {
                      "className": "bef-link edit-activiteiten--5",
                      "id": "edit-activiteiten-15",
                      "name": "activiteiten[15]",
                      "route": "/tools",
                      "label": "Cultuur"
                    },
                    {
                      "className": "bef-link edit-activiteiten--6",
                      "id": "edit-activiteiten-17",
                      "name": "activiteiten[17]",
                      "route": "/tools",
                      "label": "Mensen ontmoeten"
                    },
                    {
                      "className": "bef-link edit-activiteiten--7",
                      "id": "edit-activiteiten-1",
                      "name": "activiteiten[1]",
                      "route": "/tools",
                      "label": "Sport"
                    }
                  ]
                });
    case "1":
        return ({
                  "title": "Thema's",
                  "containerClassName": "bef-links-use-ajax bef-links",
                  "drupalSelector": "edit-themas",
                  "containerId": "edit-themas--2",
                  "dataOnce": undefined,
                  "links": [
                    {
                      "className": "bef-link edit-themas--3",
                      "id": "edit-themas-9",
                      "name": "themas[9]",
                      "route": "/tools",
                      "label": "Betrokken deelname"
                    },
                    {
                      "className": "bef-link edit-themas--4",
                      "id": "edit-themas-8",
                      "name": "themas[8]",
                      "route": "/tools",
                      "label": "De eerste keren"
                    },
                    {
                      "className": "bef-link edit-themas--5",
                      "id": "edit-themas-7",
                      "name": "themas[7]",
                      "route": "/tools",
                      "label": "Inschrijving"
                    },
                    {
                      "className": "bef-link edit-themas--6",
                      "id": "edit-themas-6",
                      "name": "themas[6]",
                      "route": "/tools",
                      "label": "Promotie en werving"
                    }
                  ]
                });
    case "2":
        return ({
                    "title": "Activiteiten",
                    "containerClassName": "bef-links-use-ajax bef-links",
                    "drupalSelector": "edit-activiteiten",
                    "containerId": "edit-activiteiten--in48l0cIfTE",
                    "dataOnce": "bef-links-use-ajax",
                    "links": [
                        {
                            "className": "bef-link edit-activiteiten--Bs2YDmr8CHQ",
                            "id": "edit-activiteiten-16--CoTok88fmUg",
                            "name": "activiteiten[16]",
                            "route": "/tools",
                            "label": "Buurtactiviteit"
                        },
                        {
                            "className": "bef-link edit-activiteiten--AeRsiql1HbQ",
                            "id": "edit-activiteiten-4--4juBhfneing",
                            "name": "activiteiten[4]",
                            "route": "/tools",
                            "label": "Creativiteit"
                        },
                        {
                            "className": "bef-link edit-activiteiten--UMAzUKVeeLk",
                            "id": "edit-activiteiten-15--LrBeckEXuH4",
                            "name": "activiteiten[15]",
                            "route": "/tools",
                            "label": "Cultuur"
                        },
                        {
                            "className": "bef-link edit-activiteiten--XLHxbTzxmZo",
                            "id": "edit-activiteiten-17--Rk_VjRFo9Iw",
                            "name": "activiteiten[17]",
                            "route": "/tools",
                            "label": "Mensen ontmoeten"
                        },
                        {
                            "className": "bef-link edit-activiteiten--TGqVDE_9P9c",
                            "id": "edit-activiteiten-1--N9uRt8i-XmM",
                            "name": "activiteiten[1]",
                            "route": "/tools",
                            "label": "Sport"
                        }
                    ]
                });
    case "3":
        return ({
                    "title": "Thema's",
                    "containerClassName": "bef-links-use-ajax bef-links",
                    "drupalSelector": "edit-themas",
                    "containerId": "edit-themas--C-UajjTvucU",
                    "dataOnce": "bef-links-use-ajax",
                    "links": [
                        {
                            "className": "bef-link edit-themas--_dyA-DyOE7c",
                            "id": "edit-themas-9--IXWoFm_IngE",
                            "name": "themas[9]",
                            "route": "/tools",
                            "label": "Betrokken deelname"
                        },
                        {
                            "className": "bef-link edit-themas--DGwdZAylGaw",
                            "id": "edit-themas-8--SvelKUnNuMc",
                            "name": "themas[8]",
                            "route": "/tools",
                            "label": "De eerste keren"
                        },
                        {
                            "className": "bef-link edit-themas--yBMCNOFae_Q",
                            "id": "edit-themas-7--1TIsL27F2Co",
                            "name": "themas[7]",
                            "route": "/tools",
                            "label": "Inschrijving"
                        },
                        {
                            "className": "bef-link edit-themas--CGzoeDqm9Ew",
                            "id": "edit-themas-6--TQHRBNThBLQ",
                            "name": "themas[6]",
                            "route": "/tools",
                            "label": "Promotie en werving"
                        }
                    ]
                });
    case "4":
        return ({
                  "title": "Locatie",
                  "containerClassName": "bef-links-use-ajax bef-links",
                  "drupalSelector": "edit-locaties",
                  "containerId": "edit-locaties--2",
                  "dataOnce": undefined,
                  "links": [
                    {
                      "className": "bef-link edit-locaties--3",
                      "id": "edit-locaties-5",
                      "name": "locaties[5]",
                      "route": "/inspiratie",
                      "label": "Brugge"
                    },
                    {
                      "className": "bef-link edit-locaties--4",
                      "id": "edit-locaties-2",
                      "name": "locaties[2]",
                      "route": "/inspiratie",
                      "label": "Knokke-Heist"
                    },
                    {
                      "className": "bef-link edit-locaties--5",
                      "id": "edit-locaties-19",
                      "name": "locaties[19]",
                      "route": "/inspiratie",
                      "label": "Oostende"
                    }
                  ]
                });
    case "5":
        return ({
                    "title": "Activiteiten",
                    "containerClassName": "bef-links-use-ajax bef-links bef-nested",
                    "drupalSelector": "edit-activiteiten",
                    "containerId": "edit-activiteiten--2",
                    "dataOnce": undefined,
                    "links": [
                        {
                            "className": "bef-link edit-activiteiten--3",
                            "id": "edit-activiteiten-16",
                            "name": "activiteiten[16]",
                            "route": "/inspiratie",
                            "label": "Buurtactiviteit"
                        },
                        {
                            "className": "bef-link edit-activiteiten--4",
                            "id": "edit-activiteiten-4",
                            "name": "activiteiten[4]",
                            "route": "/inspiratie",
                            "label": "Creativiteit"
                        },
                        {
                            "className": "bef-link edit-activiteiten--5",
                            "id": "edit-activiteiten-15",
                            "name": "activiteiten[15]",
                            "route": "/inspiratie",
                            "label": "Cultuur"
                        },
                        {
                            "className": "bef-link edit-activiteiten--6",
                            "id": "edit-activiteiten-17",
                            "name": "activiteiten[17]",
                            "route": "/inspiratie",
                            "label": "Mensen ontmoeten"
                        },
                        {
                            "className": "bef-link edit-activiteiten--7",
                            "id": "edit-activiteiten-1",
                            "name": "activiteiten[1]",
                            "route": "/inspiratie",
                            "label": "Sport"
                        }
                    ]
                });
    case "6":
        return ({
                    "title": "Thema's",
                    "containerClassName": "bef-links-use-ajax bef-links",
                    "drupalSelector": "edit-themas",
                    "containerId": "edit-themas--2",
                    "dataOnce": undefined,
                    "links": [
                        {
                            "className": "bef-link edit-themas--3",
                            "id": "edit-themas-9",
                            "name": "themas[9]",
                            "route": "/inspiratie",
                            "label": "Betrokken deelname"
                        },
                        {
                            "className": "bef-link edit-themas--4",
                            "id": "edit-themas-8",
                            "name": "themas[8]",
                            "route": "/inspiratie",
                            "label": "De eerste keren"
                        },
                        {
                            "className": "bef-link edit-themas--5",
                            "id": "edit-themas-7",
                            "name": "themas[7]",
                            "route": "/inspiratie",
                            "label": "Inschrijving"
                        },
                        {
                            "className": "bef-link edit-themas--6",
                            "id": "edit-themas-6",
                            "name": "themas[6]",
                            "route": "/inspiratie",
                            "label": "Promotie en werving"
                        }
                    ]
                });
    default:
        return ({
                  "title": "Activiteiten",
                  "containerClassName": "bef-links-use-ajax bef-links",
                  "drupalSelector": "edit-activiteiten",
                  "containerId": "edit-activiteiten--2",
                  "dataOnce": undefined,
                  "links": [
                    {
                      "className": "bef-link edit-activiteiten--3",
                      "id": "edit-activiteiten-16",
                      "name": "activiteiten[16]",
                      "route": "/tools",
                      "label": "Buurtactiviteit"
                    },
                    {
                      "className": "bef-link edit-activiteiten--4",
                      "id": "edit-activiteiten-4",
                      "name": "activiteiten[4]",
                      "route": "/tools",
                      "label": "Creativiteit"
                    },
                    {
                      "className": "bef-link edit-activiteiten--5",
                      "id": "edit-activiteiten-15",
                      "name": "activiteiten[15]",
                      "route": "/tools",
                      "label": "Cultuur"
                    },
                    {
                      "className": "bef-link edit-activiteiten--6",
                      "id": "edit-activiteiten-17",
                      "name": "activiteiten[17]",
                      "route": "/tools",
                      "label": "Mensen ontmoeten"
                    },
                    {
                      "className": "bef-link edit-activiteiten--7",
                      "id": "edit-activiteiten-1",
                      "name": "activiteiten[1]",
                      "route": "/tools",
                      "label": "Sport"
                    }
                  ]
                });
    }
}


export default TagFilter
