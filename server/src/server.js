const express = require('express');
const app = express();
const port = 8081;
const cors = require("cors")
const knex = require('knex')(require('../knexfile.js')["development"])
const bcrypt = require('bcrypt')
const saltRounds = 10;

app.use(cors());
app.use(express.json());

//still need get for a user's created items
app.get('/', (req,res) => {
    res.send('Application is running')
})

//get all items
app.get('/items', (req,res) => {
    knex('items')
        .select('*')
        .then(items => {initialCount = items.length + 1, res.json(items)})
})


//get users for log in authentication
// app.get('/users', (req,res) => {
//     knex('users')
//         .select('*')
//         .then(account => {

//             res.json(account)
//         })
// })

app.post('/login', (req,res) =>{
    const {Username, Password} = req.body;

    knex('users')
        .where({'Username':Username})
        .select('Password')
        .then((hash) =>{
            bcrypt.compare(Password, hash[0].Password, function(err, result) {
                if (result) {
                  console.log("Password Correct.")
                  knex('users')
                    .where({'Username':Username})
                    .select('id')
                    .then(id => res.json(id))
                }
                else {
                  console.log("Invalid password.");
                }
              })
        })
        .catch((err) =>{
            console.error('Authentication error: ', err);
            res.status(500).json({
                message: err
            })
        })
})

//get specific item
app.get('/items/:id', (req,res) => {
    const id = req.params;
    knex('items')
        .select('*')
        .where(id)
        .then(items => res.json(items))
})

//add an item
app.post('/items', (req,res) =>{
    const {UserId, Item_Name, Description, Quantity} = req.body;

    knex('items')
        .insert({UserId, Item_Name, Description, Quantity})
        .then(() =>{
            res.status(201).json({
                message: 'Item successfully added.'
            })
        })
        .catch((err) =>{
            console.error('Database insert error:', err);
            res.status(500).json({
                message: err
            })
        })
})

//add a user
app.post('/users', (req,res) =>{
    const {First_Name, Last_Name, Username, Password} = req.body;
    bcrypt.hash(Password, saltRounds, function(err, hash){
        knex('users')
        .insert({First_Name, Last_Name, Username, Password: hash})
        .then(() =>{
            res.status(201).json({
                message: 'User successfully added.'
            })
        })
        .catch((err) =>{
            console.error('Database insert error:', err);
            res.status(500).json({
                message: err
            })
        })
    })

})

//update an item
app.patch('/items/:id', (req,res) =>{
    const id = req.params;
    const {Item_Name, Description, Quantity} = req.body;

    knex('items')
        .where(id)
        .update({Item_Name, Description, Quantity})
        .then(() =>{
            res.status(201).json({
                message: 'Item successfully updated.'
            })
        })
        .catch((err) =>{
            console.error('Database update error:', err);
            res.status(500).json({
                message: err
            })
        })
})

//remove an item
app.delete('/items/:id', (req,res) =>{
    const id = req.params;

    knex('items')
    .where(id)
    .del()
    .then(() =>{
        res.status(201).json({
            message: 'Item successfully removed.'
        })
    })
    .catch((err) =>{
        console.error('Database delete error:', err);
        res.status(500).json({
            message: err
        })
    })
})



app. listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
