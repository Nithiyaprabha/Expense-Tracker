const mongoose = require('mongoose')

const expenseTracker = new mongoose.Schema({
    amount : {
        type : Number
    },
    category : {
        type : String
    },
    date : {
        type : String
    }
})

const Expense = mongoose.model('expenseDetails',expenseTracker)

module.exports = {Expense}