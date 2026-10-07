import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Img from './Img.tsx'
import Teaser from './Teaser.tsx'


// Component

        function TeaserImage({ imgId }: { imgId: string }) {
            return (
                <div className={"teaser__img"}>
                    <Img id={imgId} />
                </div>
            )
        }
    

export default TeaserImage
