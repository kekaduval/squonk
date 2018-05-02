
const db = require("../models");
const mongoose = require("mongoose");

//importing in other controller files so we can borrow functions from the other controllers
//example // .get(billController.findAll)
const budgetController = require("../controllers/budgetController");
const billController = require("../controllers/billController");


// Defining methods for the ArticlesController
module.exports = {
    findAll: function (req, res) {
        db.User.find(req.query)
            // .sort({ date: -1 })
            .then((dbModel) => {
                // console.log(dbModel[0].userName);
                const userObject = dbModel.map(index => {
                    return users= {
                        user: index.userName,
                        userID: index._id
                    }
                })

                // console.log("THIS IS THE NEW LOGGGGGGGGGGGGGGG",userObject);
                
                
                res.json(userObject)
            })
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        db.User.findById(id)
            .populate("budgets")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
