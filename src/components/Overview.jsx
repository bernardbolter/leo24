import { useState, useEffect, useContext } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'
import DOMPurify from 'dompurify'

const Overview = ({ post }) => {
    // console.log('over change')
    const {
        overview_size,
        overview_poster_image,
        overview_square_image,
        overview_square_video,
        overview_square_video_mobile,
        overview_landscape_image,
        overview_landscape_video,
        overview_landscape_video_mobile,
        overview_portrait_image,
        overview_portrait_video,
        overview_portrait_video_mobile
    } = post.acf

    // console.log("over square ", overview_square_video)
    const size = useWindowSize()
    const [leo, setLeo] = useContext(LeoContext)
    const [theOverview, setTheOverview] = useState('')
    const [poster, setPoster] = useState('')

    useEffect(() => {
        // console.log("in over: ", size.width)
        if (overview_poster_image) {
            setPoster(overview_poster_image.url)
        } else {
            if (size.width > 850) {
                setPoster('https://www.tlbx.app/200-300.svg')
            } else {
                setPoster('https://www.tlbx.app/200-300-e6cf8b.svg')
            } 
        }

        // DESKTOP
        if (size.width > 850) {
            if (overview_size === 'landscape') {
                if (overview_landscape_video.length !== 0) {
                    setTheOverview(`<video src="${overview_landscape_video}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_landscape_image) {
                        src = overview_landscape_image.sizes.large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            } else if (overview_size === 'portrait') {
                if (overview_portrait_video.length !== 0) {
                    setTheOverview(`<video src="${overview_portrait_video}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_portrait_image) {
                        src = overview_portrait_image.sizes.large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img class="desktop" src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            } else if (overview_size === 'large-square') {
                if (overview_square_video.length !== 0) {
                    setTheOverview(`<video src="${overview_square_video}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_square_image) {
                        src = overview_square_image.sizes.large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            } else {
                if (overview_square_video.length !== 0) {
                    setTheOverview(`<video src="${overview_square_video}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_square_image) {
                        src = overview_square_image.sizes.medium_large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            }
        // MOBILE
        } else {
            if (overview_size === 'landscape') {
                if (overview_landscape_video_mobile.length !== 0) {
                    setTheOverview(`<video src="${overview_landscape_video_mobile}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_landscape_image) {
                        src = overview_landscape_image.sizes.medium_large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            } else if (overview_size === 'portrait') {
                if (overview_portrait_video_mobile.length !== 0) {
                    setTheOverview(`<video src="${overview_portrait_video_mobile}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_portrait_image) {
                        src = overview_portrait_image.sizes.medium_large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img class="mobile"src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            } else if (overview_size === 'large-square') {
                if (overview_square_video_mobile.length !== 0) {
                    setTheOverview(`<video src="${overview_square_video_mobile}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_square_image) {
                        src = overview_square_image.sizes.medium_large
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            } else {
                if (overview_square_video_mobile.length !== 0) {
                    setTheOverview(`<video src="${overview_square_video_mobile}" autoplay loop playsinline muted poster="${poster}"></video>`)
                } else {
                    var src = ''
                    if (overview_square_image) {
                        src = overview_square_image.sizes.medium
                    } else {
                        src = poster
                    }
                    setTheOverview(`<img src="${src}" alt="thumbnail from ${post.title.rendered} project" />`)
                }
            }
        }
    }, [post])


    return (
        <a
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(theOverview)}}
            className={`post-container ${overview_size}`}
            title={post.title.rendered}
            onClick={() => {
                console.log(post.id)
                setLeo(state => ({ ...state, projectID: post.id, aboutOpen: false, infoOpen: false }))
            }}
        />
    )
}

export default Overview