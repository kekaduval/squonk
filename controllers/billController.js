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
        var gabeid = mongoose.Types.ObjectId(req.body.billId);
        console.log(req);
        
        var budId = mongoose.Types.ObjectId(req.body.budgetId);
        
        db.Bill.remove({ _id: gabeid})    
            // .then(dbModel => {dbModel.remove()})
            .then(db.Budget.update({ _id: budId }, { $pull: { bills: gabeid } }))
            .then(res.send("Done"))
            .catch(err => res.status(422).json(err));
    },




// router.post("/arrayNoteDelete/:id/:noteId", function (req, res) {
//         var id = mongoose.Types.ObjectId(req.params.id);
//         var noteId = mongoose.Types.ObjectId(req.params.noteId);
//         console.log('Hya', id);
//         console.log('Hya', noteId);
//         db.Article.update({ _id: id }, { $pull: { notes: noteId } })
//             .then(function () {
//                 res.send(req.params.noteId + " Pulled")
//             })
//             .catch(function (err) {
//                 res.json(err);
//             });
//     })

    createBill: function (req, res) {
        db.Bill.create(req.body)
            .then(dbBill => {
                var id = mongoose.Types.ObjectId(req.body.budgetId);
                console.log("This is the id " + id);
                return db.Budget.findOneAndUpdate({ _id: id }, { $push: { bills: dbBill._id } });
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};

