const mongoose = require('mongoose');
const reservation_model = require('../models/reservation-model');

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')


const should = chai.should()

chai.use(chaiHttp)

it('it should get all the reservation / GET', (done) => {

  chai.request(server)
    .get('/service_root_url')
    .end(function(err, res){
        console.log(res.body) 
      res.should.have.status(200)
      //res.should.be.json it is html
      //res.body.should.be.a('array')
      //res.body.should.have.lengthOf(5)
      done()
    })
})
