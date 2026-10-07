import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import MainContent from './MainContent.tsx'
import Banner from './Banner.tsx'
import SectionHeader from './SectionHeader.tsx'
import Teaser from './Teaser.tsx'
import ThemaContainer from './ThemaContainer.tsx'
import TeaserContainer from './TeaserContainer.tsx'
import Header from './Header.tsx'


// Component
function HomeContent() {
    return <main>
        <MainContent />
        <div id={"block-rekall-theme-content"}>
            <div className={"bg-color-pink"}>
                <div className={"banner__home"}>
                    <div className={"content"}>
                        
                                    <Banner dataId="0" />
                                
                    </div>
                </div>
                <div style={{zIndex:"1", position:"relative"}}>
                    <div className={"content"}>
                        
                                <ThemaContainer />
                            
                    </div>
                </div>
            </div>
            <div className={"views-element-container"}>
                <div className={"js-view-dom-id-e9c4486e4b10ef7e3c1278c7ecab2edd6f9a72e98ffc0a1dad6fecc734333587 full-bleed bg-color-yellow section"}>
                    <div className={"content"}>
                        <SectionHeader />
                        
                                <TeaserContainer dataId="0" />
                            
                    </div>
                </div>
            </div>
        </div>
    </main>
}


export default HomeContent
