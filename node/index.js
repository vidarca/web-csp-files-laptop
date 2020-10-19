const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin: '*'}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./router/index.js'));

app.listen(3000, () => {
})

