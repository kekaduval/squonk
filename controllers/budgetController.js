const db = require("../models");
const mongoose = require("mongoose");
var axios = require("axios");


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
        db.Budget.create(req.body)
            .then(dbBudget => {
                var id = mongoose.Types.ObjectId(req.body.userId);
                console.log("This is the id "+id);       
                return db.User.findOneAndUpdate({ _id: id }, { $push: { budgets: dbBudget._id } });
            })
            .then(dbUser => res.json(dbUser.budgets))
            .catch(err => res.status(422).json(err));
        }
};
