const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next(); // THIS IS DIFFERENT
});

const { getAllTags, getPostsByTagName } = require('../db');

// UPDATE
tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const tagName = req.params.first
    try {
      // use our method to get posts by tag name from the db
      const allPosts = getPostsByTagName(tagName)
      const posts = allPosts.filter(post => {
        return post.active && (req.user && post.author.id === req.user.id);
      });
      res.send({posts})
      // send out an object to the client { posts: // the posts }
    } catch (error) {
        next(error)
      // forward the name and message to the error handler
    }
  });

module.exports = tagsRouter;