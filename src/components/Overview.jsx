import { useContext, useRef, useState, useEffect } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'
import LazyLoad from 'react-lazy-load';
import Link from 'next/link'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { Tooltip } from 'react-tooltip'

const Overview = ({ 
    overview, 
    index, 
    id, 
    title, 
    isDesktop,
    setOverviewsCount 
}) => {
    const {
        overview_size,
        overview_image,
        overview_video,
        overview_poster
    } = overview

    const [leo, setLeo] = useContext(LeoContext)
    const [playing, setPlaying] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const size = useWindowSize()
    const elementRef = useRef(null)

    useEffect(() => {
        if (videoLoaded) {
            setPlaying(true)
        }
    }, [videoLoaded])


    return (
        <Link
            className={`post-container ${overview_size}`}
            href={{ pathname: "/projects" }}
            onClick={() => {
                setLeo(state => ({ ...state, newProjectId: id, aboutOpen: false, infoOpen: false }))
            }}
            data-tooltip-id={`tooltip-${index}`}
            data-tooltip-content={title}
            data-tooltip-offset={-5}
            ref={elementRef}
        >
                {size.width > 849 && (
                    <Tooltip 
                        id={`tooltip-${index}`} 
                        float={true}
                        style={{
                            zIndex: 2001,
                            fontSize: '13px',
                            background: 'transparent'
                        }}
                        place="top-start"
                        classNameArrow={{
                            display: 'none'
                        }}
                    />
                )}
                {!overview_image && !overview_video ? (
                    <Image
                        src={'https://www.tlbx.app/200-300.svg'}
                        alt={`thumbnail from the ${title} project`}
                        fill
                        priority
                        onLoad={() => {
                            // console.log(`svg ${index} loaded`)
                            setOverviewsCount(overviewsCount => [...overviewsCount, index])
                        }}
                    />
                ) : overview_image ? (
                    <Image
                        src={isDesktop ? overview_image.sizes.large : overview_image.sizes.medium_large}
                        alt={`thumbnail from the ${title} project`}
                        fill
                        priority
                        loading="eager"
                        style={{ objectFit: 'cover' }}
                        onLoad={() => {
                            // console.log(`image ${index} loaded`)
                            setOverviewsCount(overviewsCount => [...overviewsCount, index])
                        }}
                    />
                ) : (
                    <LazyLoad>
                        <>
                        {videoLoaded ? (
                            null
                        ) : (
                            <Image
                                src={overview_poster ? overview_poster.url : 'https://www.tlbx.app/200-300.svg'}
                                alt={`thumbnail from the ${title} project`}
                                fill
                                priority
                                loading="eager"
                                style={{ objectFit: 'cover' }}
                                onLoad={() => {
                                    // console.log(`image ${index} loaded`)
                                    setOverviewsCount(overviewsCount => [...overviewsCount, index])
                                }}
                            />
                        )}
                        <ReactPlayer
                                url={overview_video}
                                width='100%'
                                height='100%'
                                playsinline
                                muted={true}
                                playing={playing}
                                loop
                                onReady={() => {
                                    // console.log(`video ${index} loaded`)
                                    setVideoLoaded(true)
                                    setOverviewsCount(overviewsCount => [...overviewsCount, index])
                                }}
                            />
                        </>
                    </LazyLoad>
                )}
        </Link>
    )
}

export default Overview