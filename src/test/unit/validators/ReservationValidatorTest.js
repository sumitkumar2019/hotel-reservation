var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var ReservationValidator= require('../../../main/validators/ReservationValidator');

const requestObject ={
    hotelId: "hotel1",
    reservations: [
        { "reservationId": "reservation1", "name": "guest1" }
    ]
};

const request ={body:requestObject};


describe('validate Reservation', function () {

    it('should return error if json object is not able to parse', function () {
        expect(()=> ReservationValidator.validateReservation('a')).to.throw('Request Object not a JSON object');
    });
    it('should return error if Request Object is empty', function () {
        expect(() => ReservationValidator.validateReservation({body:{}})).to.throw('Request Object should not be empty');
    });
    it('should return error if Request Object does not contain hotel id', function () {
        expect(() => ReservationValidator.validateReservation({body:{hotelId:null}})).to.throw('Request Object does not contain hotel id');
    });
    it('should return error if Request Object does not contain reservations', function () {
        expect(() => ReservationValidator.validateReservation({body:{hotelId:'hotel1'}})).to.throw('Request Object does not contain reservations');
    });
    it('should return error if reservation should contain reservation Id', function () {
        expect(() => ReservationValidator.validateReservation({body:{hotelId:'hotel1',reservations:[{}]}})).to.throw('reservation should contain reservation Id');
    });
    it('should return error if reservationId not string or empty', function () {
        expect(() => ReservationValidator.validateReservation({body:{hotelId:'hotel1',reservations:[{reservationId:1}]}})).to.throw('reservationId should be string and not empty');
    });
    it('should return error if reservation should not contain guest name', function () {
        expect(() => ReservationValidator.validateReservation({body:{hotelId:'hotel1',reservations:[{reservationId:'reservation1'}]}})).to.throw('reservation should contain guest name');
    });
    it('should return error if guest name not string or empty', function () {
        expect(() => ReservationValidator.validateReservation({body:{hotelId:'hotel1',reservations:[{reservationId:'reservation1', name:1}]}})).to.throw('guest name should be string and not empty');
    });
    it('should return input data if all data correct', function () {
        return expect(ReservationValidator.validateReservation(request)).to.deep.equal(requestObject);
    });
});