// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for comments
const Thread = require('../models/thread')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { comment: { title: '', text: 'foo' } } -> { comment: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /comments
router.post('/comments', requireToken, (req, res, next) => {
  // set owner of new comment to be current user
  req.body.comment.owner = req.user.id

  // get the comment data from the body of the request
  const commentData = req.body.comment
  // get the thread id
  const threadId = commentData.threadId

  Thread.findById(threadId)
    .populate('owner')
    .populate('comments.owner')
    .then(handle404)
    .then(thread => {
      thread.comments.push(commentData)

      return thread.save()
    })
    .then(thread => res.status(201).json({ thread }))
    .catch(next)
})

// UPDATE
// PATCH /comments/5a7db6c74d55bc51bdf39793
router.patch('/comments/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.comment.owner
  const id = req.params.id
  const commentData = req.body.comment

  Thread.findById(req.body.comment.threadId)
    .then(handle404)
    .then(thread => {
      const comment = thread.comments.id(id)

      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, comment)

      comment.set(commentData)
      return thread.save()
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /comments/5a7db6c74d55bc51bdf39793
router.delete('/comments/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Thread.findById(req.body.threadId)
    .then(handle404)
    .then(thread => {
      const comment = thread.comments.id(id)

      // throw an error if current user doesn't own `comment`
      requireOwnership(req, comment)
      // delete the comment ONLY IF the above didn't throw
      comment.remove()
      thread.save()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
