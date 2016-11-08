/**
 * Created by gabrielkunkel on 11/6/16 in JavaScript.
 */

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/server'

const should = chai.should();

chai.use(chaiHttp);

describe("The request header parser server/micro-service", function () {

  it("has a running test suite.", function() {
    [].should.be.empty;
  }); // end it

  it("is defined.", function() {
    server.should.be.okay;
  }); // end it

  it("is defined to be an express server.", function(done) {
    server.use.should.be.ok;
    server.route.should.be.ok;
    server.set.should.be.ok;
    server.get.should.be.ok;
    server.listen.should.be.ok;
    server.post.should.be.ok;

    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.header;
        done();
      })

  }); // end it

  it("returns a json object on index get request", function(done) {

    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done()
      })

  }); // end it

  it("returns properties 'ipaddress', 'language', and 'software' in object", function(done) {

    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.body.ipaddress.should.be.ok;
        res.body.language.should.be.ok;
        res.body.software.should.be.ok;
        done()
      })

  }); // end it

  it("returns a valid ip address", function(done) {

    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.body.ipaddress.should.be.ip;
        done()
      })

  }); // end it

  it("returns the 'correct' ip address", function(done) {

    chai.request(server)
      .get('/')
      .set('x-forwarded-for', '100.1.8.7.97')
      .end(function (err, res) {
        res.body.ipaddress.should.be.eql('100.1.8.7.97')
        done()
      })
  }); // end it
  
  it("should return the language from Accept-Language as a string", function(done) {

    chai.request(server)
      .get('/')
      .set('accept-language', 'mb')
      .end(function (err, res) {
        res.body.language.should.be.a('String');
        res.body.language.should.eql('mb');
        done()
      })

  }); // end it

  it("should return the language from Accept-Language as a string, without additional details", function(done) {

    chai.request(server)
      .get('/')
      .set('accept-language', 'en-US,en;q=0.8')
      .end(function (err, res) {
        res.body.language.should.be.a('String');
        res.body.language.should.eql('en-US');
        done()
      })

  }); // end it


  it("should return just the operating system from the user-agent parse", function(done) {

    chai.request(server)
      .get('/')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36')
      .end(function (err, res) {
        res.body.software.should.be.a('String');
        res.body.software.should.eql('Apple Mac: OS X El Capitan');
        done()
      })

  }); // end it

}); // end describe