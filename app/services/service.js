
var mysql      = require('mysql');
var Promise = require('es6-promise').Promise;

var pool = mysql.createPool({
  host     : '104.155.161.27',
  user     : 'apiuser',
  password : 'api_user',
  database : 'sample'
});


module.exports = {
    getAllEmployees () {
        try{
        return new Promise( function(resolve,reject) {
        pool.getConnection(function(err, connection) {
        if(err)
            return reject(err);
        connection.query('SELECT * from employees', function(err, rows, fields) {            
          if (!err)
            {
            console.log('The solution is: ', rows);
            response = rows;
            if(rows.length>0)
             resolve(response);
            else
            resolve("No records");
            }
          else
            {
            console.log('Error while performing Query.');
            reject(err);
            }
            connection.release();            
            
        });
    });
    }
    );
        
    }catch(err)
    {
        reject(err);        
        console.log(err);
    }
      
    },
    getEmployeeById (id) {
        try{
        return new Promise( function(resolve,reject) {
        pool.getConnection(function(err, connection) {
        connection.query('SELECT * from employees where emp_no=?',[id], function(err, rows, fields) {
            console.log(rows);
            console.log(fields);
            
          if (!err)
            {
            console.log('The solution is: ', rows);
            response = rows;
            if(response.length>0)
             resolve(response);
            else
             resolve("No records found");

            }
          else
            {
            console.log('Error while performing Query.');
                reject(err);
            }
            connection.release();            
            
        });
    });
    }
    );
        
    }catch(err)
    {
        reject(err);        
        console.log(err);
    }
      
    },
    getEmployeeByName (name) {
        try{
        return new Promise( function(resolve,reject) {
        pool.getConnection(function(err, connection) {
        console.log('SELECT * from employees where first_name like '+name+'%\' or last_name like '+name+'%\'');
        connection.query('SELECT * from employees where first_name like ? or last_name like ?',[name+"%",name+"%"] , function(err, rows, fields) {
            console.log(rows);
            console.log(fields);
            
          if (!err)
            {
            console.log('The solution is: ', rows);
            response = rows;
            if(response.length>0)
             resolve(response);
            else
             resolve("No records found");

            }
          else
            {
            console.log('Error while performing Query.');
                reject(err);
            }
            connection.release();            
            
        });
    });
    }
    );
        
    }catch(err)
    {
        reject(err);        
        console.log(err);
    }
      
    }
  }