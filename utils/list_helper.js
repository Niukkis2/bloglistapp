const defaultReturn = {
    default: "default"
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return defaultReturn
    } else {
        let favorite = blogs[0]
        for (let i = 0; i<blogs.length; i++) {
            if (blogs[i].likes > favorite.likes) {
                favorite = blogs[i]
            }
        }
        return {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return defaultReturn
    } else {
        let authorsAndBlogCount = new Map()
        for (let i = 0; i<blogs.length; i++) {
            if (authorsAndBlogCount.has(blogs[i].author)) {
                authorsAndBlogCount.set(blogs[i].author, authorsAndBlogCount.get(blogs[i].author) + 1)
            } else {
                authorsAndBlogCount.set(blogs[i].author, 1)
            }
        }
        let authorWithMostLikes = blogs[0].author
        let entryCount = 0
        for (let [key, value] of authorsAndBlogCount.entries()) {
            if (value > entryCount) {
                entryCount = value
                authorWithMostLikes = key
            }
        }
        return {
            author: authorWithMostLikes,
            blogs: entryCount
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return defaultReturn
    } else {
        let authorsAndTotalLikes = new Map()
        for (let i = 0; i<blogs.length; i++) {
            if (authorsAndTotalLikes.has(blogs[i].author)) {
                authorsAndTotalLikes.set(blogs[i].author, authorsAndTotalLikes.get(blogs[i].author) + blogs[i].likes)
            } else {
                authorsAndTotalLikes.set(blogs[i].author, blogs[i].likes)
            }
        }
        let authorWithMostLikes = blogs[0].author
        let likeCount = blogs[0].likes
        for (let [key, value] of authorsAndTotalLikes.entries()) {
            if (value > likeCount) {
                likeCount = value
                authorWithMostLikes = key
            }
        }
        return {
            author: authorWithMostLikes,
            likes: likeCount
        }
    }
}

module.exports = {
    defaultReturn,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}