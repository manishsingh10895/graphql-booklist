const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongooose = require('mongoose');
const cors = require('cors');

const graphql = require('graphql');

const schema = require('./schema/schema');

const app = express();

const mongoUrl = 'mongodb://mongodb:27017/graphplaylist';

mongooose.connect(mongoUrl)
    .then((res) => {
        console.log("Connected to database");
    })

const PORT = process.env.PORT || 4500

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("server listening on ", PORT);
});

