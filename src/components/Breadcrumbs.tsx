import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


        type BreadcrumbsData = {
            intermediate?: {
                label: string;
                route: string;
            };
            current: string;
        }
    
// Component

        function Breadcrumbs({ dataId }: { dataId: string }) {
            const data: BreadcrumbsData = getBreadcrumbsData(dataId);

            return (
                <ul>
                    <BreadcrumbItem label="Home" route="/" />
                    {data.intermediate && (
                        <BreadcrumbItem
                            label={data.intermediate.label}
                            route={data.intermediate.route}
                        />
                    )}
                    <BreadcrumbItem label={data.current} />
                </ul>
            );
        }
    

// Subcomponents

        function BreadcrumbItem({
            label,
            route
        }: {
            label: string;
            route?: string;
        }) {
            return (
                <li>
                    {route !== undefined ? (
                        <a data-navigate-routes={JSON.stringify([route])}>
                            {label}
                        </a>
                    ) : (
                        label
                    )}
                </li>
            );
        }
    


        function getBreadcrumbsData(id: string): BreadcrumbsData {
            const stringId = String(id);

            switch (stringId) {
                case "0":
                    return {
                        current: `
             Tools
             `
                    };
                case "1":
                    return {
                        current: `
             Inspiratie
             `
                    };
                case "2":
                    return {
                        intermediate: {
                            label: "Inspiratie",
                            route: "/inspiratie"
                        },
                        current: `
             Hoe moedigt Femma deelnemers aan om (terug) te komen?
             `
                    };
                case "3":
                    return {
                        current: `
             Inschrijving
             `
                    };
                default:
                    return {
                        current: ""
                    };
            }
        }
    

export default Breadcrumbs
