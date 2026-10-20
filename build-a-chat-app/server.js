import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';
import { isAsyncFunction } from 'util/types';

const PORT = 3001;

const server = http.createServer((req, res) => {
    const files = {
        "/": {path: "./public/index.html", contentType: "text/html"},
        "/index.html": {path: "./public/index.html", contentType: "text/html"},
    };
    const file = files[req.url];
    if(!file){
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("File not Found.");
    }
    fs.readFile(file.path, (err, data) => {
        if(err){
            res.writeHead(500);
            res.end("Error loading page.");
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get("username");
    console.log("nem: ", username);
    const payload = JSON.stringify({
        type: "system",
        text: `${username} joined`,
    });
    wss.clients.forEach((client) => {
        if(client.readyState === 1){
            client.send(payload);
        }
    });

    socket.on('message', (data) => {
        try{
            const rcvdData = JSON.parse(data);
            const newPayload = JSON.stringify({
                type: "chat",
                username: rcvdData.username,
                text: rcvdData.text,
            });
            wss.clients.forEach((client) => {
                if(client.readyState === 1){
                    client.send(newPayload);
                }
            });
        }catch (error){
            console.error("Error sending message", error);
        }
    });

    socket.on('close', () => {
        //console.log(socket.readyState);
        const usr = new URL(req.url, "http://localhost").searchParams.get("username");
        const payload = JSON.stringify({
            type: "system",
            text: `${usr} left`,
        });
        wss.clients.forEach((client) => {
            if(client.readyState === 1){
                client.send(payload);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log("Chat server running at http://localhost:3001");
});