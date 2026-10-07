import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'
import MainContent from './MainContent.tsx'
import Banner from './Banner.tsx'
import Teaser from './Teaser.tsx'
import BannerImage from './BannerImage.tsx'
import SectionTitle from './SectionTitle.tsx'
import DeepdiveContainer from './DeepdiveContainer.tsx'
import TeaserContainer from './TeaserContainer.tsx'
import MediaEmbed from './MediaEmbed.tsx'
import FaqContainer from './FaqContainer.tsx'


        type ContentPageData = {
            content: JSX.Element;
            faqBasePath: string;
            faqDefaultDataId: string;
            faqStepDataId: string;
            faqTitle: string;
            trailingContent: JSX.Element;
        };
    
// Component

        function ContentPage({ dataId }: { dataId: string }) {
            const location = useLocation()
            const {
                content,
                faqBasePath,
                faqDefaultDataId,
                faqStepDataId,
                faqTitle,
                trailingContent
            }: ContentPageData = getContentPageData(dataId)

            return (
                <main>
                    <MainContent />
                    <div id={"block-rekall-theme-content"}>
                        {content}
                        <SectionBlock>
                            <SectionTitle title={faqTitle} className="section__title" />
                            {(() => {
                                switch (location.pathname + location.search + location.hash) {
                                case faqBasePath:
                                    return <FaqContainer dataId={faqDefaultDataId} firstOpen={false} />
                                case `${faqBasePath}?step=2`:
                                    return <FaqContainer dataId={faqStepDataId} firstOpen={true} />
                                default:
                                    return null
                                }
                            })()}
                        </SectionBlock>
                        {trailingContent}
                    </div>
                </main>
            )
        }
    

// Subcomponents

        function SectionBlock({ children }: { children: React.ReactNode }) {
            return (
                <div className={"full-bleed"}>
                    <div className={"content"}>
                        <div className={"section"}>
                            {children}
                        </div>
                    </div>
                </div>
            )
        }
    


        function getContentPageData(id: string): ContentPageData {
            const dataId = String(id)

            if (dataId === "1") {
                return {
                    content: (
                        <>
                            <div className={"full-bleed bg-color-green"}>
                                <div className={"content"}>
                                    <div className={"banner__theme"}>
                                        <Banner dataId="2" />
                                        <BannerImage imageId="1" />
                                    </div>
                                </div>
                            </div>
                            <div className={"full-bleed bg-color-pink"}>
                                <div className={"content"}>
                                    <div className={"section"}>
                                        <SectionTitle title="Aan de slag" className="section__title" headingId="content" />
                                        <TeaserContainer dataId="2" />
                                    </div>
                                </div>
                            </div>
                        </>
                    ),
                    faqBasePath: "/themas/inschrijving",
                    faqDefaultDataId: "2",
                    faqStepDataId: "3",
                    faqTitle: "Meer vragen",
                    trailingContent: (
                        <div className={"full-bleed bg-color-yellow"}>
                            <div className={"content"}>
                                <div className={"section"}>
                                    <SectionTitle title="Verdiep je kennis" className="section_title" />
                                    <DeepdiveContainer dataId="1" />
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            return {
                content: (
                    <>
                        <div className={"full-bleed bg-color-yellow"}>
                            <div className={"content"}>
                                <div className={"banner__inspiration"}>
                                    <Banner dataId="1" />
                                    <BannerImage imageId="34" />
                                </div>
                            </div>
                        </div>
                        <div className={"content"}>
                            <div className={"content__blocks"}>
                                <div className={"block block__text"}>
                                    <p>
                                        Via Femma Brugge komen vrouwelijke nieuwkomers en oudkomers samen om te naaien, te creëren en elkaar te ontmoeten.
                                    </p>
                                    <p>
                                        Femma organiseert een naai-atelier in het buurtcentrum van Brugge. Omdat er veel anderstaligen in de buurt wonen, is het voor hen vanzelfsprekend dat ook zij welkom zijn op hun activiteiten.
                                    </p>
                                    <p>
                                        Het is soms moeilijk om de vrouwen aan te moedigen om te komen. Om de connectie zo vlot mogelijk te laten verlopen, werkt Femma met Bala als vrijwilliger. Zij is het aanspreekpunt voor de deelnemers. Bala heeft zelf een migratieachtergrond.
                                    </p>
                                    <p>
                                        Draad voor draad groeien mooie creaties én nieuwe vriendschappen, vaardigheden en vertrouwen.
                                    </p>
                                </div>
                                <div className={"block block__media"}>
                                    <MediaEmbed />
                                </div>
                            </div>
                        </div>
                    </>
                ),
                faqBasePath: "/inspiratie/hoe-moedigt-femma-deelnemers-aan-om-terug-te-komen",
                faqDefaultDataId: "0",
                faqStepDataId: "1",
                faqTitle: "Wil je meer weten?",
                trailingContent: (
                    <>
                        <div className={"full-bleed bg-color-yellow"}>
                            <div className={"content"}>
                                <div className={"section"}>
                                    <SectionTitle title="Meer inspiraties rond dit thema zien?" className="section__title" />
                                    <TeaserContainer dataId="1" />
                                </div>
                            </div>
                        </div>
                        <div className={"full-bleed bg-color-yellow"}>
                            <div className={"content"}>
                                <div className={"section"}>
                                    <SectionTitle title="Verdiep je kennis" className="section_title" />
                                    <DeepdiveContainer dataId="0" />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        }
    

export default ContentPage
