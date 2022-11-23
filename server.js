const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const fs = require('fs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/' + 'index.html');
});

server.listen(3000, () => {
  console.log('Server running at port 3000....');
});

io.on('connection', (socket) => {
  console.log('New User Connected with ID : ' + socket.id);
  socket.on('details', (name, reg) => {
    fs.appendFile(
      'data.txt',
      ` Name : ${name} Registration No. : ${reg} , `,
      (err) => {
        if (err) throw err;
        console.log('Data Stored ');
      }
    );
    console.log(`Data is: ${name} ${reg} `);
    socket.emit('details');
  });
});
