const express = require('express');
const {Server} = require('socket.io');
const cors = require('cors');
// const io = new server(3000);
const http = require('http');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("joinRoom", (room) => {
        socket.join(room);

        socket.on("newMessage", ({newMessage, room}) => {
            console.log(room , newMessage);
            io.in(room).emit("getLatestMessage" , newMessage);
        })
    })
})

// io.on("connection", (socket) => {
//     socket.on('joinRoom', (room) => { socket.join(room);});
//     socket.on("newMessage",({newMessage, room}) => {
//         console.log( room ,newMessage);
//     })
//      })

app.get("/" , (req,res) => {
    res.send("Chat app SERVER");
})

server.listen(8000, () => { console.log("app started at port 8000");})






/* 
            // socket.on('joinRoom', (data) => {
            //     const { newMessage, room } = data; // Data sent from client when join_room event emitted
            //     socket.join(room); )

            // socket.on('joinRoom', room => {
            //     socket.leave(room)
            //     socket.removeAllListeners(room + '-newMessage');
            //     socket.to(room).emit(room + '-newMessage', 'user has left room')
            //   })
            
            

        // import { createAdapter } from "@socket.io/redis-adapter";
        // import { createClient } from "redis";
            // io.except(["room-101", "room-102"]).emit("foo", "bar");


        // const io = new Server();





        // const pubClient = createClient({ host: "localhost", port: 6379 });
        // const subClient = pubClient.duplicate();

        // io.adapter(createAdapter(pubClient, subClient));

        // // redis@3
        // io.listen(3000);

        // // redis@4
        // Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        //   io.listen(3000);
        // });





        io.on("connection", (socket) => {
    // console.log(socket.id);
    // socket.on("joinRoom" , room => socket.join(room));
    // socket.on("newMessage", ({newMessage, room}) => {
    //     console.log(room, newMessage);
    // });
    // socket.emit("hello","world");
    socket.on('joinRoom', (room) => { socket.join(room);});
    socket.on("newMessage",({newMessage, room}) => {
        console.log( room ,newMessage);
    })
     })
*/