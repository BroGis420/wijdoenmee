import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import MainContent from './MainContent.tsx'
import FilteredListing from './FilteredListing.tsx'


        type ListingMainData = {
            viewClassName: string;
            filteredListingDataId: string;
            dataOnce?: string;
        };
    
// Component

        function ListingMain({ dataId }: { dataId: string }) {
            const data: ListingMainData = getListingMainData(dataId);

            return (
                <main>
                    <MainContent />
                    <div id={"block-rekall-theme-content"}>
                        <div className={"views-element-container"}>
                            <div
                                className={data.viewClassName}
                                {...(data.dataOnce !== undefined ? { "data-once": data.dataOnce } : {})}
                            >
                                <div className={"content"}>
                                    <FilteredListing dataId={data.filteredListingDataId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            );
        }
    


        function getListingMainData(id: string): ListingMainData {
            const stringId = String(id);

            const data: Record<string, ListingMainData> = {
                "0": {
                    viewClassName: "js-view-dom-id-138b9472d4b85f40775c0f4e0fc5aca58e50e91e40dc493f5e6d18ed6de0deed bg-color-pink",
                    filteredListingDataId: "0"
                },
                "1": {
                    viewClassName: "js-view-dom-id-138b9472d4b85f40775c0f4e0fc5aca58e50e91e40dc493f5e6d18ed6de0deed bg-color-pink",
                    filteredListingDataId: "1",
                    dataOnce: "ajax-pager"
                },
                "2": {
                    viewClassName: "js-view-dom-id-9052d93cef985d7d4a49f7eb8cc9c93a58d6bd687a269f3610e8beb7ecbcbace bg-color-yellow",
                    filteredListingDataId: "2"
                },
                "3": {
                    viewClassName: "js-view-dom-id-138b9472d4b85f40775c0f4e0fc5aca58e50e91e40dc493f5e6d18ed6de0deed bg-color-pink",
                    filteredListingDataId: "3"
                }
            };

            return data[stringId] ?? data["0"];
        }
    

export default ListingMain
