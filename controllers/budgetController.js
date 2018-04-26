const db = require("../models");
const mongoose = require("mongoose");

//importing in other controller files so we can borrow functions from the other controllers
//example // .get(userController.findAll)
const billController = require("../controllers/billController");
const userController = require("../controllers/userController");


// Defining methods for the ArticlesController
module.exports = {
    findAll: function (req, res) {
        db.Budget.find(req.query)
            // .sort({ date: -1 })
            .then((dbModel) => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Budget.findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Budget.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Budget.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Budget.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // Route for saving/updating an Note and linking an Article's associated Note
    createBudget: function (req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        db.Budget.create(req.body)
            .then(dbModel => {
                var id = mongoose.Types.ObjectId(req.params.id);
                return db.Article.findOneAndUpdate({ _id: id }, { $push: { notes: dbNote._id } }, { new: true });
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }


};


// // Route for saving/updating an Note and linking an Article's associated Note
// router.post("/notes/:id", function (req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             var id = mongoose.Types.ObjectId(req.params.id);
//             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             return db.Article.findOneAndUpdate({ _id: id }, { $push: { notes: dbNote._id } }, { new: true });
//         })
//         .then(function (dbArticle) {
//             // If we were able to successfully update an Article, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });