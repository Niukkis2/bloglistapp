const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOneBlog = require('../utils/list_helper').listWithOneBlog
const listWithManyBlogs = require('../utils/list_helper').listWithManyBlogs


describe('total likes', () => {
    test('total likes of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when list has no blogs return default', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual(listHelper.defaultReturn)
    })
    test('when list has only one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })
    test('when list has many blogs', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})

describe('most blogs', () => {
    test('when list has no blogs return default', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result).toEqual(listHelper.defaultReturn)
    })
    test('when list has one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })
    test('when list has many blogs', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('when list has no blogs return default', () => {
        const result = listHelper.mostLikes(emptyList)
        expect(result).toEqual(listHelper.defaultReturn)
    })
    test('when list has one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })
    test('when list has many blogs', () => {
        const result = listHelper.mostLikes(listWithManyBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})