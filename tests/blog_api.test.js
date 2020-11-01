const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
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
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
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
test('POST request creates new blog', async () => {
    const newBlog = {
        title: 'POST test',
        author: 'POST test author',
        url: 'www.POST.com',
        likes: 2
    }
    const postRes = await api
        .post('/api/blogs')
        .send(newBlog)
    expect(postRes.body.title).toBe('POST test')
    expect(postRes.body.author).toBe('POST test author')
    expect(postRes.body.url).toBe('www.POST.com')
    expect(postRes.body.likes).toBe(2)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})
afterAll(() => {
    mongoose.connection.close()
})