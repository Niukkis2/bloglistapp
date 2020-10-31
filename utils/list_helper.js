const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
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
        return null
    } else {
        let authorsAndBlogCount = new Map()
        for (let i = 0; i<blogs.length; i++) {
            if (authorsAndBlogCount.has(blogs[i].author)) {
                authorsAndBlogCount.set(blogs[i].author, authorsAndBlogCount.get(blogs[i].author) + 1)
            } else {
                authorsAndBlogCount.set(blogs[i].author, 1)
            }
        }
        let topAuthor = blogs[0].author
        let topAuthorEntryCount = 0
        for (let [key, value] of authorsAndBlogCount.entries()) {
            if (value > topAuthorEntryCount) {
                topAuthorEntryCount = value
                topAuthor = key
            }
        }
        return {
            author: topAuthor,
            blogs: topAuthorEntryCount
        }
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}