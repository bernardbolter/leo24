import { useContext } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Overview = ({ overview, id, title, isDesktop }) => {
    const {
        overview_size,
        overview_image,
        overview_video,
        overview_poster
    } = overview

    const [leo, setLeo] = useContext(LeoContext)
    const router = useRouter()

    return (
        <a
            className={`post-container ${overview_size}`}
            title={title}
            onClick={() => {
                setLeo(state => ({ ...state, currentID: id, aboutOpen: false, infoOpen: false }))
                router.push('/projects')
            }}
        >
            {overview_image ? (
                <Image
                    src={isDesktop ? overview_image.sizes.large : overview_image.sizes.medium_large}
                    alt={`thumbnail from the ${title} project`}
                    fill
                    style={{ background: '#333' }}
                />
            ) : (
                <video src={overview_video} autoPlay loop playsInline muted poster={overview_poster ? overview_poster : 'https://www.tlbx.app/200-300.svg'}></video>
            )}
        </a>
    )
}

export default Overview