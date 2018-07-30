var td = require('testdouble');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
var requester = chai.request(server).keepOpen() ;

var reservation = [
    { reservationId: "reservation1", name: "guest1" },
];

var requestObject={
    hotelId: "hotel1",
    reservations: reservation
};

after('After Reservation Test', function(){
    requester.close();
});
describe('Reservation', () => {
    describe('/post Import', () => {
        it('it should Post reservation with request object having all required data', (done) => {
            requester
                .post('/api/import')
                .send(requestObject)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(true);
                    expect(res.body.message).to.equal('We are processing your request on first come first serve basis');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object having empty request object', (done) => {
            requester
                .post('/api/import')
                .send({})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('Request Object should not be empty');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object does not contain hotel id' , (done) => {
            requester
                .post('/api/import')
                .send({reservations:reservation})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('Request Object does not contain hotel id');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object does not contain reservations', (done) => {
            requester
                .post('/api/import')
                .send({hotelId:'hotel1'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('Request Object does not contain reservations');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object does not contain reservation Id', (done) => {
            requester
                .post('/api/import')
                .send({hotelId:'hotel1',reservations:[{}]})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('reservation should contain reservation Id');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object contain reservation Id but empty', (done) => {
            requester
                .post('/api/import')
                .send({hotelId:'hotel1',reservations:[{reservationId:''}]})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('reservationId should be string and not empty');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object does not contain guest name', (done) => {
            requester
                .post('/api/import')
                .send({hotelId:'hotel1',reservations:[{reservationId:'reservation1'}]})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('reservation should contain guest name');
                    done();
                });
        });
    });

    describe('/post Import', () => {
        it('it should Post reservation with request object contain guest name but empty', (done) => {
            requester
                .post('/api/import')
                .send({hotelId:'hotel1',reservations:[{reservationId:'reservation1', name:''}]})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(res.body).to.exist;
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('guest name should be string and not empty');
                    done();
                });
        });
    });


});