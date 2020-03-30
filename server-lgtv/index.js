const {powerCtrl, volumeCtrl} = require('./controller');
const express = require('express');
const app = express();
 

const port = 6767

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/connect', powerCtrl.connect);
app.get('/disconnect', powerCtrl.disconnect);
app.get('/setVolume/:vol', volumeCtrl.setVolume);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));