### To Run Application

### Install Software

* Latest Node JS : from https://nodejs.org/en/
* Git Client : https://git-scm.com/downloads
* MongoDB : https://www.mongodb.com/download-center?jmp=nav#community
* Rabbit MQ Server : http://www.rabbitmq.com/download.html
* Postman : https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

### Configure Rabbit MQ Server
* Download and install Rabbit MQ server.
* Go to start menu in windows -> Run  RabbitMQ service - start option
* Go to start menu in windows -> Run  RabbitMQ command prompt
* write <b>rabbitmq-plugins enable rabbitmq_management</b> and Click Enter
* Rabbit MQ Managment localhost console is binded with port no:15672
* Go to browser and type url: http://localhost:15672/
* default username and password is username: guest password:guest 
* once management console is open, create Exchange with the name reservation_exchange
* once Exchange is created, create Queue with the name reservation_queue

### Configure MongoDB

* Download and install MongoDB Server.
* if MongoDB server not started Go to the folder where MongoDB is installed Generally: <b>C:\Program Files\MongoDB\Server\4.0\bin</b>
* Run mongod.exe
* if still not run then restart the mongodb server from 'services' in Windows control panel

### Clone the Application

* git clone https://github.com/sumitkumar2019/hotel-reservation.git
* go to the directory hotel-reservation: add command to the command line : CD hotel-reservation


### Install Dependencies

```
npm install
```
Note: if still any dependency missing, install it with 'npm install 'dependency-module-name' --save

### Test the Application

```
npm test
```
* This will run all the integration and unit test cases.
 
<b>Note:</b> Before Running test cases Rabbit MQ server and MongoDB server is <b>not required</b>. it can simply run writing on the console <b>npm test</b>

### Run the Application

```
npm start
```
<b>Note:</b> Before Running the application, Please make sure <b>Rabbit MQ Server</b>, <b>MongoDB Server</b> should be in runnable state before making the request to the application

* Now Run api at <b>[`localhost:3000'].</b>

### Sending Request to the Application

* Open post man and Create Request
* Select Post method for the request and in the URL type <b>http://localhost:3000/api/import</b>
* Select body from the tab below the url.
* After selection multiple radio button will be visible select <b>raw</b>.
* Select format as Json and Enter input json in below format:

  {
  "hotelId": "hotel1",
  "reservations": [
    {
      "reservationId": "reservation1",
      "name": "guest1"
    }
  ]
}

<b>Note:</b> It is not mandatory to use postman tool you can use whatsoever tool or methodology to send request to the application. 

Thank You