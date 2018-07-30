"use strict";
const logger = require('../../../middleware/Logger/logger');
const _ = require('lodash');

/**
 * @class ReservationValidator: This Class is a helper class for validating the request.
 */
class ReservationValidator {

    /**
     *@method validateReservation: This method will validate the reservation request
     * and return it back to the controller. It provide basic data type and null checks
     * @param req
     * @returns {any}
     */
    validateReservation(req) {

        var requestObject = JSON.stringify(req.body);

        logger.info('Received HTTP request - ' + requestObject);

        try{
            requestObject = JSON.parse(requestObject);
        }catch(error){
            throw new Error('Request Object not a JSON object');
        }

        if (_.isEmpty(requestObject) || _.isUndefined(requestObject) || _.isNull(requestObject)) {
            throw new Error('Request Object should not be empty');
        }

        if (_.isEmpty(requestObject.hotelId) || _.isUndefined(requestObject.hotelId) || _.isNull(requestObject.hotelId)) {
            throw new Error('Request Object does not contain hotel id');
        }

        var reservationList = requestObject.reservations;

        if (_.isEmpty(reservationList) || _.isUndefined(reservationList) || _.isNull(reservationList)) {
            throw new Error('Request Object does not contain reservations');
        }

        reservationList.forEach(reservation => {
            if (_.isUndefined(reservation.reservationId) || _.isNull(reservation.reservationId)) {
                throw new Error('reservation should contain reservation Id');
            }
            if (!_.isString(reservation.reservationId) || _.isEmpty(reservation.reservationId)) {
                throw new Error('reservationId should be string and not empty');
            }
            if ( _.isUndefined(reservation.name) || _.isNull(reservation.name)) {
                throw new Error('reservation should contain guest name');
            }
            if (!_.isString(reservation.name) || _.isEmpty(reservation.name)) {
                throw new Error('guest name should be string and not empty');
            }
        });

        return requestObject;
    }
}

module.exports = new ReservationValidator();
