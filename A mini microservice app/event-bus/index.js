const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
const events = [];

app.post('/events', (
    req
    ,res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event);
    axios.post('http://comments-cluesterip-srv:4001/events', event);
    axios.post('http://queries-clusterip-srv:4002/events', event);
    axios.post('http://moderations-cluesterip-srv:4003/events', event);

    res.send({status: 'OK'});
})

app.get('/events', (
    req,
    res) => {

    res.send(events);

})

app.listen(4005, () => {
    console.log('4005 listening by Event-bus');
});
