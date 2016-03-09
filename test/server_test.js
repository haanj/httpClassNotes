'use strict';
require(__dirname + '/../server');

var fs = require('fs');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;

describe('Vanilla HTTP server tests', () => {
  var html;
  before((done) => {
    fs.readFile(__dirname + '/../public/index.html', (err, data) => {
      html = data.toString();
      done();
    });
  });


  it('should respond to /hello with hello', (done) => {
    request('localhost:3000')
      .get('/hello')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({message: 'hello'});
        done();
      });
  });
  it('should send back an index page', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(html);
        expect(res.text.indexOf('<body>')).to.be.above(-1);
        done();
      });
  });
  it('should return the 404 page', (done) => {
    request('localhost:3000')
      .get('/404idj')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.equal('404 Not Found');
        done();
      });
  });
});

describe('New test', () => {
  it('should do stuff');
});
