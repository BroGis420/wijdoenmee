import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import Img from './Img.tsx'
import Banner from './Banner.tsx'


// Component

        function BannerImage({ imageId }: { imageId: string }) {
            return (
                <div className={"banner__img"}>
                    <Img id={imageId} />
                </div>
            )
        }
    

export default BannerImage
