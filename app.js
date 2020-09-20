
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const messagesRoutes = require('./controller/messagesRoute');

const app = express();
const port = 4000;

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('I am ok!')
})

// app.get('/messages', messagesRoutes.getMessagesHandler)
app.get('/message' ,messagesRoutes.getUserMessagesHandler)
app.post('/message', messagesRoutes.postMessageHandler)


app.listen(port, () => {
  console.log(`listening at port: ${port}`)
})