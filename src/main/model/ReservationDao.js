"use strict";
const logger = require('../../../middleware/Logger/logger');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const _ = require('lodash');

/**
 * @class ReservationDao : This is a Data Access Object which provide required reservation models to the service classes
 */
class ReservationDao {

    /**
     * @method saveReservation: This method will verify if record already exist with the specific reservation Id in database and if not found then save the record in the database
     * @param reservations
     * @returns {Array}
     */
    saveReservation(reservations) {

        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err)
                throw err;
            var documents = filterRecords(reservations);
            var dbo = db.db("hotel");

            documents.forEach(document => {
                var query = {_id: document._id};
                dbo.collection("reservation").find(query).count(function (err, count) {
                    if (count === 0) {
                        dbo.collection("reservation").insertOne(document, function (err, res) {
                            if (err) {
                                throw err;
                            }
                            logger.info('Finished processing job for Reservation Id:' + document._id + ' - Job -' + JSON.stringify(document));
                        });
                    } else {
                        logger.info('Duplicated Reservation not processed for Reservation Id: ' + document._id + ' - Job -' + JSON.stringify(document));
                    }
                });

            });
        });
    }

}

/**
 * @method filterRecords: This method will filter all the reservation list and return an array of object which we can save in Database
 * @param reservations
 * @returns {Array}
 */
function filterRecords(reservations) {

    var filteredReservations = [];

    reservations = JSON.parse(reservations);

    var hotelId = reservations.hotelId;

    var reservations = reservations.reservations;
    reservations.forEach(reservation => {
        reservation.hotelId = hotelId;
        reservation._id = reservation.reservationId;
        delete reservation.reservationId;
        filteredReservations.push(reservation);
    });

    return filteredReservations;
}

module.exports = new ReservationDao();
