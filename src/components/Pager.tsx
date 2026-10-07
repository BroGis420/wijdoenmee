import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import PaginationPage from './PaginationPage.tsx'
import PaginationLink from './PaginationLink.tsx'


        type PagerData = {
            items: Array<
                | {
                    kind: "page";
                    className: string;
                    title: string;
                    route: string;
                    page: number;
                }
                | {
                    kind: "link";
                    className: string;
                    title: string;
                    hiddenLabel: string;
                    label: string;
                    rel?: string;
                }
            >;
        };
    
// Component

        function Pager({ dataId }: { dataId: string }) {
            const { items }: PagerData = getPagerData(dataId);

            return (
                <ul className={"pager__items js-pager__items"}>
                    {items.map((item, index) =>
                        item.kind === "page" ? (
                            <PageItem
                                key={index}
                                className={item.className}
                                title={item.title}
                                route={item.route}
                                page={item.page}
                            />
                        ) : (
                            <LinkItem
                                key={index}
                                className={item.className}
                                title={item.title}
                                hiddenLabel={item.hiddenLabel}
                                label={item.label}
                                rel={item.rel}
                            />
                        )
                    )}
                </ul>
            );
        }
    

// Subcomponents

        function PageItem({
            className,
            title,
            route,
            page
        }: {
            className: string;
            title: string;
            route: string;
            page: number;
        }) {
            return (
                <li className={className}>
                    <PaginationPage title={title} route={route} page={page} />
                </li>
            );
        }

        function LinkItem({
            className,
            title,
            hiddenLabel,
            label,
            rel
        }: {
            className: string;
            title: string;
            hiddenLabel: string;
            label: string;
            rel?: string;
        }) {
            return (
                <li className={className}>
                    {rel === undefined ? (
                        <PaginationLink
                            title={title}
                            hiddenLabel={hiddenLabel}
                            label={label}
                        />
                    ) : (
                        <PaginationLink
                            title={title}
                            hiddenLabel={hiddenLabel}
                            label={label}
                            rel={rel}
                        />
                    )}
                </li>
            );
        }
    


        function getPagerData(id: string): PagerData {
            const dataId = String(id);

            const data: Record<string, PagerData> = {
                "0": {
                    items: [
                        {
                            kind: "page",
                            className: "pager__item is-active",
                            title: "Huidige pagina",
                            route: "/themas/inschrijving",
                            page: 1
                        },
                        {
                            kind: "page",
                            className: "pager__item",
                            title: "Ga naar pagina 2",
                            route: "/tools",
                            page: 2
                        },
                        {
                            kind: "link",
                            className: "pager__item pager__item--next",
                            title: "Ga naar volgende pagina",
                            hiddenLabel: "Volgende pagina",
                            label: "→",
                            rel: "next"
                        },
                        {
                            kind: "link",
                            className: "pager__item pager__item--last",
                            title: "Ga naar laatste pagina",
                            hiddenLabel: "Laatste pagina",
                            label: "Laatste →"
                        }
                    ]
                },
                "1": {
                    items: [
                        {
                            kind: "link",
                            className: "pager__item pager__item--first",
                            title: "Ga naar eerste pagina",
                            hiddenLabel: "Eerste pagina",
                            label: "← Eerste"
                        },
                        {
                            kind: "link",
                            className: "pager__item pager__item--previous",
                            title: "Ga naar vorige pagina",
                            hiddenLabel: "Vorige pagina",
                            label: "←",
                            rel: "prev"
                        },
                        {
                            kind: "page",
                            className: "pager__item",
                            title: "Ga naar pagina 1",
                            route: "/themas/inschrijving",
                            page: 1
                        },
                        {
                            kind: "page",
                            className: "pager__item is-active",
                            title: "Huidige pagina",
                            route: "/themas/inschrijving",
                            page: 2
                        }
                    ]
                },
                "2": {
                    items: [
                        {
                            kind: "page",
                            className: "pager__item is-active",
                            title: "Huidige pagina",
                            route: "/themas/inschrijving",
                            page: 1
                        },
                        {
                            kind: "page",
                            className: "pager__item",
                            title: "Ga naar pagina 2",
                            route: "/themas/inschrijving",
                            page: 2
                        },
                        {
                            kind: "link",
                            className: "pager__item pager__item--next",
                            title: "Ga naar volgende pagina",
                            hiddenLabel: "Volgende pagina",
                            label: "→",
                            rel: "next"
                        },
                        {
                            kind: "link",
                            className: "pager__item pager__item--last",
                            title: "Ga naar laatste pagina",
                            hiddenLabel: "Laatste pagina",
                            label: "Laatste →"
                        }
                    ]
                }
            };

            return data[dataId] ?? data["0"];
        }
    

export default Pager
