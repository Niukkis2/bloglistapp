const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { userName: 1, name: 1 })
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
})
  
blogsRouter.post('/', async (request, response) => {
    const token = request.token
    let decodedToken
    if (token) {
        decodedToken = jwt.verify(token, process.env.SECRET)
    }
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (request.body.title && request.body.url) {
        const user = await User.findById(request.body.userId)
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog)
    } else {
        response.status(400).end()
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const toDelete = await Blog.findById(request.params.id)
    if (decodedToken.id.toString() === toDelete.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).send('invalid token provided')
    }
})

blogsRouter.patch('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).send(res)
})

module.exports = blogsRouter