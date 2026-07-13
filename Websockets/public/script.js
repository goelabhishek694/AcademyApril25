const socket = io();
const btn = document.getElementById("send");
const input = document.getElementById("message");
const ul = document.getElementById("list");
const createGroupBtn = document.getElementById("createGroup");
const joinGroupBtn = document.getElementById("joinGroup");
const sendToGroupBtn = document.querySelector("#sendToGroup");
const leaveGroupBtn = document.querySelector("#leaveGroup");

socket.on("connect", () => {
    const h1 = document.querySelector("h1");
    console.log(h1);
    h1.innerText = "Websockets " + socket.id;
});

btn.addEventListener("click", () => {
    const msg = input.value;
    const div = document.createElement("div");
    div.setAttribute("class", "sender");
    const li = document.createElement("li");
    li.innerText = msg;
    const para = document.createElement("p");
    para.innerText = "sender";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);

    socket.emit("message", msg);
    input.value = "";
});

createGroupBtn.addEventListener("click", () => {
    console.log("group created req")
    socket.emit("create_grp", "room-123");
});

joinGroupBtn.addEventListener("click", () => {
    console.log("group join req")
    socket.emit("join_grp","room-123");
});

sendToGroupBtn.addEventListener("click", () => {
    let value = input.value;
    let data = {
        msg: value,
        room: "room-123"
    }
    console.log(value);
    if(value){
        socket.emit("grp_msg", data);
    }
});

leaveGroupBtn.addEventListener("click", () => {
    socket.emit("leave_grp", "room-123");
});

socket.on("serv_grp_message", (data) => {
    console.log("grp message", data);
});

socket.on("message", (data) => {
    console.log("connected to server ", data);
});

socket.on("broadcast", (data) => {
    console.log("broadasted msg ", data);
    const div = document.createElement("div");
    div.setAttribute("class", "receiver");
    const li = document.createElement("li");
    li.innerText = data;
    const para = document.createElement("p");
    para.innerText = "receiver";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);
})
