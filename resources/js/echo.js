import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
});

let onlineUsers = [];
window.Echo.join("online")
    .here((users) => {
        onlineUsers = users
        console.log("Online users:", onlineUsers);
    })
    .joining((user) => {
        onlineUsers.push(user);
        console.log(user.name + " is online");
        console.log("Online users:", onlineUsers);
        // Add user to the online users list
    })
    .leaving((user) => {
        onlineUsers = onlineUsers.filter((onlineUser) => onlineUser.id != user.id);
        console.log(user.name + " is offline");
        console.log("Online users:", onlineUsers);
        // Remove user from the online users list
    });
