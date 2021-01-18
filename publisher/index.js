const express = require('express');
const bodyParser = require('body-parser');
const task = require('./routes/task');

const PORT = 3005;
let app = express();


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api/v1', task);

app.listen(PORT, ()=>{
    console.log(' ********** : running on 30006');
})