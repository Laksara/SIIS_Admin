const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoutes = express.Router();
const PORT = 4000;

let Admin = require('./admin.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/admins', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

adminRoutes.route('/').get(function(req, res) {
    Admin.find(function(err, admins) {
        if (err) {
            console.log(err);
        } else {
            res.json(admins);
        }
    });
});

adminRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Admin.findById(id, function(err, admin) {
        res.json(admin);
    });
});

adminRoutes.route('/update/:id').post(function(req, res) {
    Admin.findById(req.params.id, function(err, admin) {
        if (!admin)
            res.status(404).send("data is not found");
        else
            admin.admin_email = req.body.admin_email;
            admin.admin_name = req.body.admin_name;
            admin.admin_position = req.body.admin_position;
            admin.admin_deleted = req.body.admin_deleted;

            admin.save().then(admin => {
                res.json('Admin updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

adminRoutes.route('/add').post(function(req, res) {
    let admin = new Admin(req.body);
    admin.save()
        .then(admin => {
            res.status(200).json({'admin': 'admin added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new admin failed');
        });
});

app.use('/admins', adminRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});