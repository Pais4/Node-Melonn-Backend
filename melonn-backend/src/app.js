const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const routes = require('./routes')
const app = express()

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    console.log('MongoDB connected');
} catch (error) {
    console.log(error);
}

app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});