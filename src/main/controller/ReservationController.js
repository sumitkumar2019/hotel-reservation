"use strict";
const _ = require('lodash');
var ReservationService = require('../services/ReservationService');
var ReservationValidator = require('../validators/ReservationValidator');

/**
 * @class ReservationController : This is a Controller Object which controls the application
 */
class ReservationController {

    /**
     * constructor
     * @param router
     */
    constructor(router) {
        this.router = router;
        this.registerPath();
    }

    /**
     * registerPath: This method Register the /import Path
     */
    registerPath() {
        this.router.post('/import', this.import.bind(this));
    }

    /**
     * @method import: This method will be invoked for path /import. It validates the reservation request
     * and send request in queue using reservationQueue Service
     * and send temporary response to the client if it success else send error to the client
     * @param req
     * @param res
     */
    import(req, res) {
        try{
            var reservation = ReservationValidator.validateReservation(req);
            ReservationService.reservationQueue(JSON.stringify(reservation));
            res.send({success: true, message:'We are processing your request on first come first serve basis', sent: reservation});
        }catch(error){
            res.status(500).send({success: false, message:error.message});
        }
    }

    /**
     * @method: This method invoked by the application initially
     * to process all the reservations once it find any request in the queue
     */
    queueProcessing(){
            ReservationService.reservationProcessing();
    }
}



module.exports = ReservationController;
