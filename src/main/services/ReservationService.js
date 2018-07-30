"use strict";
const logger = require('../../../middleware/Logger/logger');
const _ = require('lodash');
const rabbitMQ = require('../../../middleware/Messaging/mq-server');
var ReservationDao = require('../model/ReservationDao');

/**
 * @class ReservationService : This is a Service Layer Object which provide required reservation services to the controller classes
 */
class ReservationService {

    /**
     * @method reservationQueue: This method will get connection from Rabbit MQ Server and then it creates a channel
     * and store the coming request from the users in a reservation_queue under a reservation_exchange. This method is
     * a middleware service provider to the application. it sends all the request to a message queue so that a
     * consumer service will take care of those request for further processing.
     * @param message
     */
    reservationQueue(message){

        rabbitMQ(connection => {
            if(_.isUndefined(connection) || _.isNull(connection)){
                return;
            }
            connection.createChannel(function (err, channel) {

                   if (err) {
                       throw new Error('Error in Message Queue Channel creation');
                   }

                   var reservationExchange = 'reservation_exchange';
                   var reservationQueue = 'reservation_queue';

                   channel.assertExchange(reservationExchange, 'direct', {durable: false});
                   channel.publish(reservationExchange, '', Buffer.from(message), {persistent: false});
                   channel.assertQueue(reservationQueue, {durable: true});
                   channel.sendToQueue(reservationQueue, Buffer.from(message), {persistent: true});

                   logger.info('Push job to queue - ' + message);
            });

            setTimeout(function() {
                connection.close();
            }, 30000);
        });

    }

    /**
     * @method reservationProcessing: This is consumer service for the message queue. This method also get connection
     * from Rabbit MQ server and create a channel through which it process the request which are available in the queue.
     * Since the channel.prefetch(1) it will process one request at a time for the further processing.
     * For Processing the request it will call the Dao layer method saveReservation to save all the reservation in the database.
     */
    reservationProcessing() {
        rabbitMQ(connection => {
            if(_.isUndefined(connection) || _.isNull(connection)){
              return;
            }
            connection.createChannel(function (err, channel) {
                if (err) {
                    throw new Error('Error in Message Queue Channel creation')
                }

                var reservationQueue = 'reservation_queue';

                channel.assertQueue(reservationQueue, {durable: true}, function (err, status) {
                    if (err) {
                        throw new Error('Error in Message Queue Assertion');
                    }
                });

                channel.prefetch(1);

                channel.consume(reservationQueue, function (message) {
                    setTimeout(function () {
                        message = message.content.toString();
                        logger.info('Started processing job - ' + message);
                        ReservationDao.saveReservation(message);
                    }, 10000);
                    channel.ack(message);
                }, {noAck: false});
            });
        });
    }

    }

module.exports = new ReservationService();
