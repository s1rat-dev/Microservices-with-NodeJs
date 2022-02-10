const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors())
app.use(bodyParser.json());

const handleComments = async (type,data) =>  {

    if(type === 'CommentCreated') {
        const status = data.content.includes('orange') ?
            'rejected' :
            'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id:data.id,
                postId: data.postId,
                status: status,
                content: data.content
            }});
    }

}

app.post('/events',  async (
    req,
    res) => {

    console.log('Received event:', req.body.type);
    const {type, data} = req.body;
    await handleComments(type, data);

    res.send({});

})


app.listen(4003, async () => {
    console.log('4003 listening by Moderation.');

    const res = await axios.get('http://event-bus-srv:4005/events');

    res.data.forEach(event => {
        handleComments(event.type,event.data);
    });

})

