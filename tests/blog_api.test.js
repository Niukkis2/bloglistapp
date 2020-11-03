const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

describe('blogs API tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Promise.all(listHelper.initialBlogs
            .map(async blog => await new Blog(blog).save()))
    })
    describe('GET requests', () => {
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(listHelper.initialBlogs.length)
        })
        test('a specific blog is within the returned blogs', async () => {
            const response = await api.get('/api/blogs')
            const titles = response.body.map(r => r.title)
            expect(titles).toContain('Testblog 2')
        })
        test('identifier property is named id', async () => {
            const response = await api.get('/api/blogs/')
            expect(response.body[0].id).toBeDefined()
        })
    })
    
    describe('POST requests', () => {
        test('POST request creates new blog', async () => {
            let newBlog = {
                title: 'POST test',
                author: 'POST test author',
                url: 'www.POST.com',
                likes: 2
            }
            const postRes = await api
                .post('/api/blogs')
                .send(newBlog)
            newBlog.id = postRes.body.id
            expect(postRes.body).toEqual(newBlog)
            const res = await api.get('/api/blogs')
            expect(res.body).toHaveLength(listHelper.initialBlogs.length + 1)
        })
        test('missing likes property defaults to 0', async () => {
            const blogWithNoLikes = {
                title: 'No likes',
                author: 'No likes author',
                url: 'www.nolikes.com'
            }
            const postRes = await api
                .post('/api/blogs')
                .send(blogWithNoLikes)
            expect(postRes.body.likes).toBe(0)
        })
        test('title and url missing respond with bad request', async () => {
            const blogMissingTitleAndUrl = {
                author: 'missing',
                likes: 5
            }
            const postRes = await api
                .post('/api/blogs')
                .send(blogMissingTitleAndUrl)
            expect(postRes.status).toEqual(400)
        })
    })
    
    describe('DELETE requests', () => {
        test('delete request removes blog', async () => {
            const blogs = await api.get('/api/blogs')
            const id = blogs.body[0].id
            const delRes = await api
                .delete(`/api/blogs/${id}`)
            expect(delRes.status).toEqual(204)
        })
    })
    
    describe('PATCH requests', () => {
        test('changing likes of blog', async () => {
            const blogs = await api.get('/api/blogs')
            const blog = {
                title: blogs.body[0].title,
                author: blogs.body[0].author,
                url: blogs.body[0].url,
                likes: blogs.body[0].likes + 1
            }
            const id = blogs.body[0].id
            const patchRes = await api
                .patch(`/api/blogs/${id}`)
                .send(blog)
            expect(patchRes.body.likes).toBe(blogs.body[0].likes + 1)
        })
    })
})

describe('users API tests', () => {
    beforeEach(async () => {
        await Promise.all(listHelper.initialUsers
            .map(async user => await new User(user).save()))
    })
    describe('POST requests', () => {
        test('invalid user not created', async () => {
            const invalidUser = {
                userName: "no",
                name: "invalid",
                passWord: "pa"
            }
            const postRes = await api
                .post('/api/users')
                .send(invalidUser)
            expect(postRes.status).toEqual(400)
        })
    })
})
afterAll(() => {
    mongoose.connection.close()
})