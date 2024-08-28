const mongoose= require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Connection successful");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats=[
    {
        from:"neha",
        to:"rahul",
        msg:"hello",
        created_at:new Date(),
    },

    {
        from:"rohiy",
        to:"mohit",
        msg:"hello",
        created_at:new Date(),
    },

    {
        from:"amit",
        to:"sumit",
        msg:"hello",
        created_at:new Date(),
    },
    {
        from:"annu",
        to:"shakshi",
        msg:"hello",
        created_at:new Date(),
    },
    {
        from:"preeti",
        to:"saloni",
        msg:"hello",
        created_at:new Date(),
    },
    {
        from:"bahi",
        to:"sis",
        msg:"hello",
        created_at:new Date(),
    },

];

Chat.insertMany(allChats);
    