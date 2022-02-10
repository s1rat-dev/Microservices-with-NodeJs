const axios = require('axios');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get('/posts', (
    req,
    res) => {

    res.send(posts);

})

const handleEvent = (type,data) => {

    if( type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};

    }

    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];

        post.comments.push({id, content, status});

    }

    if (type === 'CommentUpdated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];

        const comment = post.comments.find(comment => comment.id === id);
        console.log(comment);
        console.log(content);
        comment.status = status;
        comment.content = content;

    }

}


app.post('/events', (
    req,
    res) => {

    console.log('Received event:', req.body.type);
    const { type, data } = req.body;

    handleEvent(type,data);

    res.send({});

})


app.listen(4002,async () => {
    console.log('4002 listening by Query');
    const res = await axios.get('http://event-bus-srv:4005/events');
    res.data.forEach(event => {
        handleEvent(event.type,event.data);
    })
})
