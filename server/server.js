const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const model = require('../server/model');
const Chat = model.getModel('chat');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.listen(9099)

io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter)

app.listen(9093, () => {
  console.log('Server start at prot 9093')
});


