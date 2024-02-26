export const arrangePosts = (posts, isDesktop) => {
    var noOrderPosts = []
    var orderedPosts = []
    var newOrderedPosts = []

    posts.map(post => {
        if (isDesktop) {
            if (post.acf.mobile_order.length === 0) {
                noOrderPosts.push(post)
            } else {
                orderedPosts.push(post)
            }
        } else {
            if (post.acf.desktop_order.length === 0) {
                noOrderPosts.push(post)
            } else {
                orderedPosts.push(post)
            }
        }
    })

    if (isDesktop) {
        newOrderedPosts = orderedPosts.sort(function (a,b) { return parseInt(a.acf.mobile_order) - parseInt(b.acf.mobile_order)})
        noOrderPosts.map(post => orderedPosts.push(post))
        noOrderPosts.map(post => ({ ...post, screen: 'desktop' }))
    } else {
        newOrderedPosts = orderedPosts.sort(function (a,b) { return parseInt(a.acf.desktop_order) - parseInt(b.acf.desktop_order)})
        noOrderPosts.map(post => orderedPosts.push(post))
        noOrderPosts.map(post => ({ ...post, screen: 'mobile' }))
    }

    // console.log(newOrderedPosts)

    return newOrderedPosts
}

export const createProjectsWithImageArray = ( id, projects, width ) => {
    console.log("help width: ", width)
    var currentProject = projects.filter(project => project.id === id)
    var sortedProjects = projects.filter(project => project.id !== id)
    sortedProjects.unshift(currentProject[0])

    var projectsWithLength = []
    sortedProjects.map(project => {
        var imagesArray = [];
        for (var i=1; i<21; i++) {
          if (width <= 850) {
            if (project.acf[`portfolio_image_portrait_${i}`] !== false || project.acf[`portfolio_video_portrait_${i}`] !== false) {
              imagesArray.push(i)
            }
          } else {
            if (project.acf[`portfolio_image_landscape_${i}`] !== false || project.acf[`portfolio_video_landscape_${i}`] !== false) {
              imagesArray.push(i)
            }
          }
        }
        project['imagesArray'] = imagesArray
        projectsWithLength.push(project)
    })

    return projectsWithLength
}