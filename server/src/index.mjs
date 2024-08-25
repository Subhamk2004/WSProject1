import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {});

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log('Server running on port ', PORT);
});

app.get('/',(req,res) => {
    res.send('Hello World!').status(200);
} )