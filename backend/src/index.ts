import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 5000 }, () =>
  console.log("ws server started successfully")
);

function genRoomId(length: number) {
  const validCharacters = "mnbvcxzasdfghjklpoiuytrewq1234569870";
  let id: string = "";
  for (let i = 0; i < length; i++) {
    const element =
      validCharacters[Math.floor(Math.random() * validCharacters.length)];
    id += element;
  }
  return id;
}

const allSockets: any = {
  global: [],
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      const messageObj = JSON.parse(message as unknown as string);
      console.log(messageObj);
      const allRoomIds = Object.keys(allSockets);
      console.log(allRoomIds);

      if (messageObj.type === "create") {
        let roomId: string;
        do {
          roomId = genRoomId(5);
        } while (allRoomIds.includes(roomId));
        console.log(roomId);

        allSockets[roomId] = [ws];

        ws.send(JSON.stringify({ type: "sucess", message: roomId }));
      }

      if (messageObj.type == "join") {
        if (
          !messageObj.payload.roomId ||
          !allRoomIds.includes(messageObj.payload.roomId)
        ) {
          ws.send(`roomId ${messageObj.payload.roomId} does not exist`);
          return;
        }

        allSockets[messageObj?.payload?.roomId] = [
          ...allSockets[messageObj?.payload?.roomId],
          ws,
        ];
        ws.send(
          JSON.stringify({
            type: "success",
            message: `user joined room: ${messageObj?.payload?.roomId}`,
          })
        );
      }

      if (messageObj.type == "chat") {
        const roomId = messageObj.payload.roomId;

        if (
          !roomId ||
          !allRoomIds.includes(roomId) ||
          !allSockets[roomId].find((socket: WebSocket) => socket == ws)
        ) {
          ws.send(
            JSON.stringify({ type: "error", message: "Invalid room ID" })
          );

          return;
        }

        allSockets[roomId].forEach((socket: WebSocket) => {
          if (socket != ws) {
            ws.send(
              JSON.stringify({
                type: "chat",
                message: messageObj.payload.message,
              })
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on("close", (event) => {});

  ws.send("connected");
});
