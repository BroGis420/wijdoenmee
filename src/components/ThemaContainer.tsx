import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Img from './Img.tsx'
import NavigationLink from './NavigationLink.tsx'


// Component

        function ThemaContainer() {
            return (
                <div className={"thema__container"}>
                    <ThemaItem id="0" navigationDataId="4" />
                    <ThemaItem id="1" navigationDataId="5" />
                    <ThemaItem id="2" navigationDataId="6" />
                    <ThemaItem id="3" navigationDataId="7" />
                </div>
            )
        }
    

// Subcomponents

        function ThemaItem({
            id,
            navigationDataId
        }: {
            id: string;
            navigationDataId: string;
        }) {
            return (
                <div className={"thema"}>
                    <Img id={id} />
                    <h2 className={"thema__title"}>
                        <NavigationLink dataId={navigationDataId} />
                    </h2>
                </div>
            )
        }
    

export default ThemaContainer
