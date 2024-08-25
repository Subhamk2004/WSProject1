import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
}));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5174', 'http://localhost:5173'],
        credentials: true,
    },
});

const PORT = process.env.PORT || 3000;


// io is entire circuit
io.on('connection',(socket) => {
    console.log('User Connected with ID: ' + socket.id);
    socket.emit('onboard', `Welcome to the server`)
    socket.broadcast.emit('onboard', `This is broadcast ${socket.id} just joined`)
    // in the broadcast the socket.id is the id of the user sending the message 
    socket.on('message', (data) => {
        console.log(data);
        // io.emit('recieve', data); this will send message to the sender itself
        // socket.broadcast.emit('recieve', data); this will send message to all user but not the sender itself
        
    })

    socket.on('disconnect',() => {
        console.log('User disconnected', socket.id);
    })
})



server.listen(PORT,() => {
    console.log('Server running on port ', PORT);
});

app.get('/',(req,res) => {
    res.send('Hello World!').status(200);
} )