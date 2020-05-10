var express = require('express');
var router = express.Router(); 
var auth = require('../auth/auth');
var { ErrorHandler } = require('../helpers/error');
var Comment = require('../models/comment');

/**
 * GET Request
 * Get comment by documentId
 */
router.get('/doc/:documentId', auth, (req, res, next) => {
    Comment.find({
        document_id: req.params.documentId
    },
    (err, data) => {
        if (err) {
            return next(new ErrorHandler(400, err.message));
        }

        res.status(200).send(data);
    })
});

/**
 * POST Request
 * Upload comment for document
 * Request param: documentId
 * Request body: name, text
 */
router.post('/upload/:documentId', auth, (req, res, next) => {
    console.log(req.body);
    var comment = new Comment({ 
        document_id : req.params.documentId,
        name : req.body.name,
        text: req.body.text
    })

    comment.save((err, newComment) => {
        if (err) {
            next(new ErrorHandler(400, err.message));
        }

        res.send(newComment);
    });
})

/**
 * PUT Request
 * Update comment for document
 * Request param : commentId
 */
router.put('/edit/:id', auth, (req, res, next) => {
    Comment.findByIdAndUpdate(
        req.params.id,
        { $set : { text: req.body.text } },
        { new : true },
        (err, updatedComment) => {
            if (err) {
                return next(new ErrorHandler(err.statusCode, err.message));
            }
            res.status(200).send(updatedComment);
        }
    );
});

router.delete('/delete/:id', auth, (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id, (err, result) => {
        if (!result || err) 
            return next(new ErrorHandler(400, "Comment not found"));

        console.log(result);

        res.status(200).send({ response: "Deleted" });
    });
})

module.exports = router;