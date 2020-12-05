import io from "socket.io-client";

export const initializeSocket = (host) => {
  let socket = null;

  try {
    socket = io("http://localhost:5000", {
      reconnection: false,
    });

    return socket;
  } catch (err) {
    console.log(err);
  }
};
