const defaultReturn = {
    default: "default"
}
const initialBlogs = [
    {
        title: "Testblog 1",
        author: "Testauthor 1",
        url: "www.test1.com",
        likes: 1
    },
    {
        title: "Testblog 2",
        author: "Testauthor 2",
        url: "www.test2.com",
        likes: 2
    }
]
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const listWithManyBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 } ]
const initialUsers = [
    {
        userName: "user1",
        name: "User One",
        passWord: "secret1"
    },
    {
        userName: "user2",
        name: "User Two",
        passWord: "secret2"
    }
]
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
    initialBlogs,
    listWithOneBlog,
    listWithManyBlogs,
    initialUsers,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}