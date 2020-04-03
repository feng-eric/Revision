var express = require('express');
var router = express.Router(); 
var AWS = require("aws-sdk");
var multer = require("multer");
var Document = require('../models/Document');
var auth = require('../auth/auth');


var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

/**
 * All Routes Requires Authorization To Access
 */


/**
 * GET Request
 * Gets all the documents
 */
router.get('/', auth, (req, res, next) => {
    try {
        Document.find(
            {},
            null,
            {
                sort: { createdAt: 1 }
            },
            (err, docs) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send(docs);
            }
        )
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * GET Request
 * Request Param: objectId
 * Gets the document based on objectId in the collection
 */
router.get('/:id', auth, (req, res, next) => {
    Document.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(data);
    });
});

/**
 * GET Request
 * Request Param: documentId
 * Gets the document based on the documentId
 */
router.get('/documentId/:documentId', auth, (req, res, next) => {
    Document.findOne({
        document_id: req.params.documentId
    },
    (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.status(200).json(data);
    })
})

/**
 * GET Request
 * Request Param: s3key, which is the original name of the file
 * Gets the document based on the file name in s3
 */
router.get('/s3key/:s3key', auth, (req, res, next) => {
    Document.find(
        {
            s3_key : req.params.s3key
        },
        (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.status(200).json(data);
        }
    )
})

/**
 * GET Request
 * Request Parameter: documentName
 * Gets the document based on the document name passed in as a request parameter
 */
router.get('/documentName/:documentName', auth, (req, res, next) => {
    Document.find(
        {
            document_name : req.params.documentName
        },
        (err, data) => {
            if (err) {
                return next(err);
            }
            res.status(200).json(data);
        
        }
    )
})

/**
 * POST Request
 * Request Parameter: documentName
 * Request Body: file
 * Uploads the document into the storage and the document metadata into the mongoDB collection
 */
router.post('/upload/:documentName', auth, upload.single('file'), (req, res) => {
    const file = req.file;
    const documentName = req.params.documentName;
    const s3FileURL = process.env.AWS_UPLOAD_FILE_URL;

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    };
    
    s3bucket.upload(params, (err, data) => {
        if (err) {
            console.log('error')
            res.status(500).json({error: true, Message: err });
        } else {
            res.send({data});

            Document.updateOne(
                { s3_key : params.Key },
                {
                    $set: {
                        document_name: documentName,
                        description: req.body.description,
                        fileLink: s3FileURL + file.originalname,
                        s3_key: params.Key
                    }
                },
                { upsert : true },
                (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Saved new doc");
                }

            )
        }
    });
});

/**
 * PUT Request
 * Request Parameter: objectId
 * Request Body: description
 * Edits the description of the document
 */
router.put('/edit/:id', auth, (req, res, next) => {
    Document.findByIdAndUpdate(
        req.params.id,
        { $set : { description: req.body.description } },
        { new : true },
        (err, updateDoc) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(updateDoc);
        }
    );
});

/**
 * DELETE REQUEST
 * Request Parameter: objectId
 * Deletes the document
 */
router.delete('/:id', auth, (req, res, next) => {
    Document.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }

        let s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        let params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: result.s3_key
        };

        s3bucket.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    status: "200",
                    responseType: "string",
                    response: "success"
                });
            }
        });
    });
});

module.exports = router;