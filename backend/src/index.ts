import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 5000 }, () =>
  console.log("ws server started successfully")
);

const allSockets: any = {
  global: [],
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      const messageObj = JSON.parse(message as unknown as string);
      console.log(messageObj);

      if (messageObj.type == "join") {

        

        if (allSockets[messageObj.payload.roomId]) {
          allSockets[messageObj?.payload?.roomId] = [
            ...allSockets[messageObj?.payload?.roomId],
            ws,
          ];
        } else {
          allSockets[messageObj?.payload?.roomId] = [ws];
        }
      }

      if (messageObj.type == "chat") {
        const allKeys = Object.keys(allSockets);

        console.log(allKeys);

        let currentUserRoom: string = "";

        allKeys.forEach((key) => {
          const filteredSocket = allSockets[key].filter(
            (s: WebSocket) => s === ws
          );
          if (filteredSocket.length > 0) {
            currentUserRoom = key;
          }
        });

        console.log(currentUserRoom);

        allSockets[currentUserRoom].forEach((socket: WebSocket) => {
          if (socket != ws) {
            socket.send(messageObj.payload.message);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.send("connected");
});
