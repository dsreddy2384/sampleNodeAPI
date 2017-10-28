const express = require('express')
const bodyParser = require('body-parser')
const store = require('./app/services/service.js')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/employees', (req, res) => {
  store
    .getAllEmployees()
    .then(function(data){
        console.log('data.....');
        var start = req.query.start;
        var end = req.query.end;
        var response 
        if( start && end)
            response = data.slice (start,end);       
        else        
            response = data;
        res.status(200).json({response})})
    .catch(function(err){
            if(err)
                res.status(500).json("service error, please try again");
        });
        
})
app.get('/employees/:id', (req, res) => {
    store
      .getEmployeeById(req.params.id)
      .then(function(data){
        if(err)
            res.status(500).json("service error, please try again");
        var response =data;
        
          console.log('data.....');
       
          res.status(200).json({response})})
      .catch(function(err){
            if(err)
                res.status(500).json("service error, please try again");
        });;
  })
app.get('/employees/name/:name', (req, res) => {
    store
      .getEmployeeByName(req.params.name)
      .then(function(data){
          if(err)
            res.status(500).json("service error, please try again");
          var response =data;
          
          console.log('data.....');
       
          res.status(200).json({response})})
        .catch(function(err){
            if(err)
                res.status(500).json("service error, please try again");
        });;

  }) 
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})