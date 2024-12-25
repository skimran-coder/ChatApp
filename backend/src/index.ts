import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 }, () =>
  console.log("ws server started successfully")
);

function genRoomId(length: number) {
  const validCharacters = "MNBVCXZASDFGHJKLPOIUYTREWQ1234569870";
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
  const allRoomIds = Object.keys(allSockets);

  ws.on("message", (message) => {
    try {
      const messageObj = JSON.parse(message as unknown as string);

      if (messageObj.type === "create") {
        let roomId: string;
        do {
          roomId = genRoomId(6);
        } while (allRoomIds.includes(roomId));
        console.log(roomId);

        allSockets[roomId] = [ws];

        ws.send(
          JSON.stringify({ type: "create", success: true, payload: { roomId } })
        );
      }

      if (messageObj.type == "join") {
        if (
          !messageObj.payload.roomId ||
          !allRoomIds.includes(messageObj.payload.roomId)
        ) {
          ws.send(
            JSON.stringify({
              type: "join",
              success: false,
              payload: {
                message: `roomId ${messageObj.payload.roomId} does not exist`,
              },
            })
          );
          return;
        }

        allSockets[messageObj?.payload?.roomId] = [
          ...allSockets[messageObj?.payload?.roomId],
          ws,
        ];

        ws.send(
          JSON.stringify({
            type: "join",
            success: true,
            payload: {
              message: `user joined room: ${messageObj?.payload?.roomId}`,
              roomId: messageObj.payload.roomId,
            },
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
            JSON.stringify({
              type: "chat",
              success: false,
              payload: {
                message: "Invalid room ID",
                roomId,
              },
            })
          );

          return;
        }

        allSockets[roomId].forEach((socket: WebSocket) => {
          if (socket !== ws) {
            socket.send(
              JSON.stringify({
                type: "chat",
                success: true,
                payload: { message: messageObj.payload.message, roomId },
              })
            );
          }
        });
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          success: false,
          error: "Invalid message format.",
        })
      );
    }
  });

  ws.on("close", (event) => {
    allRoomIds.forEach((id) => {
      console.log(allSockets[id]);
      allSockets[id] = allSockets[id].filter(
        (socket: WebSocket) => ws !== socket
      );
    });
  });

  ws.send(
    JSON.stringify({
      type: "connection",
      success: true,
      payload: {
        message: "web socket connected successfully!",
      },
    })
  );
});
