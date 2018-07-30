var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var ReservationDao = require('../../../main/model/ReservationDao');

var  reservation={
    hotelId: "hotel1",
    reservations: [
        { "reservationId": "reservation1", "name": "guest1" }
    ]
};

beforeEach('Before Each: Reservation Dao Test', function(){
});
afterEach('After Each: Reservation Dao Test', function(){
    td.reset();
});

describe('save Reservation', function () {
    it('should save when request object is proper', function () {
        return expect(ReservationDao.saveReservation(JSON.stringify(reservation))).to.be.deep.equal(undefined);
    });

});