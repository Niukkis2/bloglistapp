const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
})
  
blogsRouter.post('/', async (request, response) => {
    if (request.body.title && request.body.url) {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
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
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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