var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var express = require('express');
var router = express.Router();

var res, ReservationService, reservationController, reservationValidator;
var response = {
    send: function(){},
    status: function(){}
}

beforeEach('Before Each: Stock Controller', function(){
    ReservationService = td.replace('../../../main/services/ReservationService');
    reservationValidator = td.replace('../../../main/validators/ReservationValidator');

    var ReservationController = require('../../../main/controller/ReservationController');
    reservationController = new ReservationController(router);

    res = td.object(response);

    td.when(ReservationService.reservationProcessing()).thenReturn({});
    td.when(ReservationService.reservationQueue()).thenReturn({});
    td.when(reservationValidator.validateReservation(td.matchers.anything())).thenReturn({});
    td.when(res.send(td.matchers.anything())).thenReturn({});
    td.when(res.status(td.matchers.anything())).thenReturn(res);
});

afterEach('After Each: Reservation Controller', function(){
 td.reset();
});

describe('Import Reservation', function () {
    it('should send response when request object is proper', function () {
        return expect(reservationController.import({},res)).to.be.equal(undefined);
    });
    it('should throw error when request object is proper', function () {
        td.when(reservationValidator.validateReservation(td.matchers.anything())).thenThrow(new Error());
        return expect(reservationController.import({},res)).to.be.equal(undefined);
    });
});

describe('Reservation Processing', function () {
    it('should not return if called but processing queue should start', function () {
        return expect(reservationController.queueProcessing()).to.be.equal(undefined);
    });
});