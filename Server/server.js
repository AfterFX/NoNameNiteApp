const express = require("express");
const bodyParser = require('body-parser');

//connect to db
const db = require('./database/database');

//load Models
const User = require("./models/Users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = 8081 || 8080;


db.authenticate()
.then(() => {
    console.log("Logged in to DB");
    User.init(db);
    User.sync();

    User.findOrCreate({
        where: {id: 1}
    }).then(r => {
        console.log("created")
    })
}).catch(err => console.log(err));

app.post("/user/signin", (req, res) => {
    User.findOne({
        where: {id: 1}
    }).then(r => {
        res.json({
            status: "SUCCESS",
            message: "Signin successful",
            data: {
                id: r.id,
                name: r.name,
                email: r.email,
                password: r.password,
                dateOfBirth: r.dateOfBirth
            }
        });
    })
});

app.post("/user/signup", (req, res) => {
    User.findOne({
        where: {id: 1}
    }).then(r => {
        res.json({
            status: "SUCCESS",
            message: "Signin successful",
            data: {
                id: r.id,
                name: r.name,
                email: r.email,
                password: r.password,
                dateOfBirth: r.dateOfBirth
            }
        });
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
