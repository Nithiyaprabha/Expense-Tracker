console.log("Hello")
console.log("Hello")
/**
 * Adding a new Expense/income : /add-expense->post
 * Displaying existing expenses : /get-expense
 * Editing exiting expenses : /edit-expenses    ->patch/put
 * Deleting expenses  : /delete-expense   ->delete
 */

/**
 * Budget Reporting 
 * Creating new user
 * Validating user
 * 
 * Defining Schema
 * Category,amount,date,income/expense
 */

const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const {Expense} = require("./schema.js")
const app = express()



async function connectToDb(){
    try{
    await mongoose.connect('mongodb+srv://nithiyaprabhar:nithiya2005@cluster0.a02jqzo.mongodb.net/Expense-Tracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DB connection established")
    const port=process.env.PORT || 4000
    app.listen(port,function(){ 
        console.log(`Listening on port ${port}...`)
    })
}
catch(error){
    console.log(error)
    console.log('Couldn \'t establish connection :')
}
}
// mongoose.connect-asynchronous function
connectToDb()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

app.post('/add-expense',async function(request,response){
  try{
    await Expense.create({
        "amount" : request.body.amount,
        "category" : request.body.category,
        "date" : request.body.date
    })
    response.status(201).json({
        "status" : "success",
        "message" : "new entry created"
    })
}
catch(error){
    console.log(error)
    response.status(500).json({
        "status" : "failure",
        "message" : "can't create new entry",
        "error" : error
    })
}
})
//expense.find is a asychronous function 
app.get('/get-expense',async function(request,response){
    try{
    const expenseData = await Expense.find()
    response.status(200).json(expenseData)
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch entries",
            "error" : error
        })
    }
})

app.delete('/delete-expense/:id',async function(request,response){
    try{
        const expenseData = await Expense.findById(request.params.id)
        console.log(request.params.id)
    if(expenseData){
       await Expense.findByIdAndDelete(request.params.id)
       response.status(200).json({
        "status":"success",
        "message" : "deleted entry",
       })     
    }else{
        response.status(404).json({
            "status" :"failure",
            "message" : "could not find entry"
        })
    }
    }
    catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch entries",
            "error" : error
        })
    }
    
})

app.patch('/edit-expense/:id',async function(request,response){
    const expenseEntry = Expense.findById(request.params.id)
    try{
        if(expenseEntry){
            await expenseEntry.updateOne({
               "amount": request.body.amount,
               "category" : request.body.category,
               "date" : request.body.date
           })
           response.status(200)
       }
       else{
           response.status(500).json({
               "status" :"failure",
               "message" : "could not find entry"
       })
   
       }
    }
    catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch entries",
            "error" : error
        })

    }
})

// const port=8000
// app.listen(port,function(){
//     console.log(`Listening on port ${port}...`)
// })