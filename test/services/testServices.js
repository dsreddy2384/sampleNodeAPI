var chai = require('chai') 
, spies = require('chai-spies'),
mysqlmock = require('mysql-mock-node');;
//var app = require ('./../../app.js')

chai.use(spies);
var sinon = require('sinon'); 
chaiHttp = require('chai-http');
var proxyquire = require('proxyquire'); 
chai.use(chaiHttp);
var mockConnection =
{
    query: function(string,array,cb)
    {
        console.log('query');
        return cb(null,"success");
    },
    release: function()
    {
        return true;
    }
    
}
var stub = sinon.stub(mockConnection,'query');

var mocksql=
{
    
     createPool: function(){
        return {
            getConnection: function(cb){
            return cb(null,mockConnection);
    
        }}
    }
}

var mockResponse = {
     "response":'success'
};


var service = proxyquire('./../../app/services/service',{'mysql':mocksql},{'pool':mocksql.createPool()}); 

var app = proxyquire('./../../app.js',{'service.js':service});

describe('SaveEmployee', function() {

    var expect  = require('chai').expect;
    var request = require('request');
    beforeEach(function(done)
    {
        stub.reset();
        stub.resolves(mockResponse);
        done();
    })
    
    it('should fail for empty request', function(done) {
        chai.request(app).post('/employees').send({}).end(function(err,res) {
            expect(res.body.Errors).to.equal('Invalid Input');
            done();
            
        });
    });

    it('should fail for invalid request', function(done) {
        chai.request(app).post('/employees').send({"id":123}).end(function(err,res) {
            expect(res.body.Errors).to.be.of.length(5);
            done();
            
        });
    });

    it('should fail for datatype for id', function(done) {
        chai.request(app).post('/employees').send({"id":"abc","birthDate":"1956-08-27","firstName":"Phillips","lastName":"Best","gender":"M","hireDate":"2011-10-04"}).end(function(err,res) {
            expect(res.body.Errors).to.be.of.length(1);
            expect(res.body.Errors).to.be.not.null;
            done();
            
        });
    });  
    it('should succeed for valid values', function(done) { 
        service.saveEmployee({"id":1,"birthDate":"1956-08-27","firstName":"Phillips","lastName":"Best","gender":"M","hireDate":"2011-10-04"}).then(function(res) {
            expect(res).to.be.ok;
            done();
        }).catch(function(err){
            done(err);
        });
    });   
    it('should throw error for invalid request ', function(done) { 
        stub.rejects({"Error":"Invalid Request"});
        service.saveEmployee({"birthDate":"1956-08-27","firstName":"Phillips","lastName":"Best","gender":"M","hireDate":"2011-10-04"}).then(function(res) {
            expect(res).to.be.ok;
            done("Should not have succeeded");
        }).catch(function(err){
        if(err)
            {
                expect(err.Error).to.eql("Invalid Request");
                done();
            }
        });
    });   
  
    // We can have more its here
  });