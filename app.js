const express = require('express')
const bodyParser = require('body-parser')
const store = require('./app/services/service.js')
var util  = require('./app/services/Util.js');
let swagger = require('./docs/swagger.json');
var Validator = require('swagger-model-validator');
var validator = new Validator(swagger);


const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/employees',util.validateSchema(swagger.paths['/employees'].post.parameters[0].schema),(req, res) => {
if(req.errors)
    {
        if(!(Object.keys(req.body).length === 0))
            return res.status(500).json({"Errors": req.errors});
        else  
            return res.status(500).json({"Errors": "Invalid Input"});
    }
    store.saveEmployee(req.body).
    then(function (employee) {
            var response = employee;
            res.status(200).json({
                response
            })
        })
        .catch(function (err) {
            if (err)
                res.status(500).json("cannot insert record , received error from backend " + err.message);
        });

})
app.get('/employees', (req, res) => {
    store
        .getAllEmployees()
        .then(function (data) {
            console.log('data.....');
            var start = req.query.start;
            var end = req.query.end;
            var response
            if (start && end)
                response = data.slice(start, end);
            else
                response = data;
            res.status(200).json({
                response
            })
        })
        .catch(function (err) {
            if (err)
                res.status(500).json("service error, please try again");
        });

})
app.get('/employees/:id', (req, res) => {
    store
        .getEmployeeById(req.params.id)
        .then(function (data) {
            if (err)
                res.status(500).json("service error, please try again");
            var response = data;

            console.log('data.....');

            res.status(200).json({
                response
            })
        })
        .catch(function (err) {
            if (err)
                res.status(500).json("service error, please try again");
        });;
})
app.get('/employees/name/:name', (req, res) => {
    store
        .getEmployeeByName(req.params.name)
        .then(function (data) {
            if (err)
                res.status(500).json("service error, please try again");
            var response = data;

            console.log('data.....');

            res.status(200).json({
                response
            })
        })
        .catch(function (err) {
            if (err)
                res.status(500).json("service error, please try again");
        });;

})
module.exports = 
app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})