export const arrangeMobilePosts = posts => {
    var noOrderPosts = []
    var orderedPosts = []
    var mobilePosts = []

    posts.map(post => {
        if (post.acf.mobile_order.length === 0) {
            noOrderPosts.push(post)
        } else {
            orderedPosts.push(post)
        }
    })
    orderedPosts = orderedPosts.sort(function (a,b) { return parseInt(a.acf.mobile_order) - parseInt(b.acf.mobile_order)})
    noOrderPosts.map(post => orderedPosts.push(post))

    orderedPosts.map(post => {
        var imageArray = []
        for (var i=1; i<21; i++) {
            if (post.acf[`portfolio_image_portrait_${i}`] || post.acf[`portfolio_video_portrait_${i}`]) {
                imageArray.push({
                    image: post.acf[`portfolio_image_portrait_${i}`] ? post.acf[`portfolio_image_portrait_${i}`] : false,
                    video: post.acf[`portfolio_video_portrait_${i}`] ? post.acf[`portfolio_video_portrait_${i}`] : false,
                    video_length: post.acf[`portfolio_mobile_video_length_${i}`] ? post.acf[`portfolio_mobile_video_length_${i}`] : "5",
                    thumbnail: post.acf[`portfolio_mobile_video_thumbnail_${i}`] ? post.acf[`portfolio_mobile_video_thumbnail_${i}`] : false
                })
            }
        }

        var overviewObject = {
            overview_size: post.acf.overview_mobile_size,
            overview_image: post.acf.overview_mobile_image,
            overview_video: post.acf.overview_mobile_video,
            overview_poster: post.acf.overview_mobile_poster
        }

        mobilePosts.push({ ...post, imageArray: imageArray, overview: overviewObject })
    })

    return mobilePosts
}

export const arrangeDesktopPosts = posts => {
    var noOrderPosts = []
    var orderedPosts = []
    var desktopPosts = []

    posts.map(post => {
        if (post.acf.desktop_order.length === 0) {
            noOrderPosts.push(post)
        } else {
            orderedPosts.push(post)
        }
    })
    orderedPosts = orderedPosts.sort(function (a,b) { return parseInt(a.acf.desktop_order) - parseInt(b.acf.desktop_order)})
    noOrderPosts.map(post => orderedPosts.push(post))

    orderedPosts.map(post => {
        var imageArray = []

        for (var i=1; i<21; i++) {
            if (post.acf[`portfolio_image_landscape_${i}`] || post.acf[`portfolio_video_landscape_${i}`]) {
                imageArray.push({
                    image: post.acf[`portfolio_image_landscape_${i}`] ? post.acf[`portfolio_image_landscape_${i}`] : false,
                    video: post.acf[`portfolio_video_landscape_${i}`] ? post.acf[`portfolio_video_landscape_${i}`] : false,
                    video_length: post.acf[`portfolio_video_length_${i}`] ? post.acf[`portfolio_video_length_${i}`] : "5",
                    thumbnail: post.acf[`portfolio_thumbnail_${i}`] ? post.acf[`portfolio_thumbnail_${i}`] : false
                })
            }
        }

        var overviewObject = {
            overview_size: post.acf.overview_size,
            overview_image: post.acf.overview_desktop_image,
            overview_video: post.acf.overview_desktop_video,
            overview_poster: post.acf.overview_desktop_poster
        }

        desktopPosts.push({ ...post, imageArray: imageArray, overview: overviewObject })
    })

    // console.log("og po: ", posts)
    // console.log("mo po: ", orderedPosts)
    // console.log("de  im po: " , desktopPosts)

    return desktopPosts
}