var amqp = require('amqplib/callback_api');
const logger = require('../Logger/logger');

/**
 * This is an anonymous callback method which provide a rabbit MQ connection.
 * it returns a CallBackModel
 * @param cb
 */
module.exports = function(cb) {

    amqp.connect('amqp://localhost', function(err, conn) {
            if (err) {
                console.log('Please start Rabbit MQ Server before sending request....');
                return;
            }
            cb(conn);
    });

};