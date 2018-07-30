var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var connectionMock = {
    createChannel:function () {},
    close:function () {}
}

var channelMock ={
    assertExchange:function () {},
    publish:function () {},
    assertQueue:function () {},
    sendToQueue:function () {},
    prefetch:function () {},
    consume:function () {},
    ack:function () {}
}
var connection = td.object(connectionMock);
var channel = td.object(channelMock);

var ReservationDao = td.replace('../../../main/model/ReservationDao');
var rabbitMQ = td.replace('../../../../middleware/Messaging/mq-server');
var ReservationService = require('../../../main/services/ReservationService');

beforeEach('Before Each: Reservation Service Test', function(){
    td.when(rabbitMQ(td.callback(connection))).thenReturn(undefined);
    td.when(connection.createChannel(td.callback(null, channel))).thenReturn(undefined);
    td.when(connection.close()).thenResolve();
    td.when(channel.assertExchange(td.matchers.anything(),td.matchers.anything(), td.matchers.anything())).thenReturn();
    td.when(channel.publish(td.matchers.anything(),td.matchers.anything(), td.matchers.anything(),td.matchers.anything())).thenReturn();
    td.when(channel.assertQueue(td.matchers.anything(),td.matchers.anything())).thenReturn();
    td.when(channel.sendToQueue(td.matchers.anything(),td.matchers.anything(), td.matchers.anything())).thenReturn();
    td.when(channel.prefetch(td.matchers.anything())).thenReturn();
    td.when(channel.consume(td.matchers.anything(),td.callback({content:'abc'}),td.matchers.anything())).thenReturn();
    td.when(channel.ack(td.matchers.anything())).thenReturn();
    td.when(ReservationDao.saveReservation(td.matchers.anything())).thenResolve();
});
afterEach('After Each: Reservation Service Test', function(){
    td.reset();
});
describe('reservation Queue', function () {
    it('should return no connection when message server is down', function () {
        td.when(rabbitMQ(td.callback(undefined))).thenReturn(undefined);
        return expect(ReservationService.reservationQueue('abc')).to.be.deep.equal(undefined);
    });
    it('should throw error when channel creation has error', function () {
        td.when(connection.createChannel(td.callback(new Error('Channel creation error'), channel))).thenReturn(undefined);
        return expect(()=>ReservationService.reservationQueue('abc')).to.throw('Error in Message Queue Channel creation');
    });
    it('should publish message to the queue when all good', function () {
        return expect(ReservationService.reservationQueue('abc')).to.be.deep.equal(undefined);
    });

});

describe('Reservation Processing', function () {
    it('should return no connection when message server is down', function () {
        td.when(rabbitMQ(td.callback(undefined))).thenReturn(undefined);
        return expect(ReservationService.reservationProcessing()).to.be.deep.equal(undefined);
    });
    it('should throw error when channel creation has error', function () {
        td.when(connection.createChannel(td.callback(new Error('Channel creation error'), channel))).thenReturn(undefined);
        return expect(()=>ReservationService.reservationProcessing()).to.throw('Error in Message Queue Channel creation');
    });
    it('should throw error when assert queue has error', function () {
        td.when(channel.assertQueue(td.matchers.anything(),td.matchers.anything(), td.callback(new Error('Error in Message Queue Assertion'),td.matchers.anything()))).thenReturn();
        return expect(()=>ReservationService.reservationProcessing()).to.throw('Error in Message Queue Assertion');
    });
    it('should subscribe and save reservation if all good', function () {
        return expect(ReservationService.reservationProcessing()).to.be.deep.equal(undefined);
    });

});