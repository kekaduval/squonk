const db = require("../models");
const mongoose = require("mongoose");

//importing in other controller files so we can borrow functions from the other controllers
//example // .get(userController.findAll)
const budgetController = require("../controllers/budgetController");
const userController = require("../controllers/userController");


// Defining methods for the ArticlesController
module.exports = {
    findAll: function (req, res) {
        db.Bill.find(req.query)
            // .sort({ date: -1 })
            .then((dbModel) => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Bill.findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Bill.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Bill.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Bill.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
