const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverried=require("method-override");

app.use(express.json());

// Correct way to set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverried("_method"));
main().then(() => {
    console.log("Connection successful");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//index Route
app.get("/chats", async (req, res) => {
     let chats= await Chat.find();
    console.log(chats);
     res.render("index.ejs",{chats});
});
//new route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//create route
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),

    });
   
   
    newChat.save().then((res) =>{
    console.log("chat was saved");
   }).catch((err)=>{
    console.log(err);
   });
    res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit", async (req,res)=>{
    let{id}=req.params;
let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
    // update route
    app.put("/chats/:id", async (req, res) => {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        console.log(newMsg);
      
        try {
          let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
          console.log(updatedChat); // Use console.log instead of console.error
          res.redirect("/chats");
        } catch (err) {
          console.error(err);
          res.status(500).send("Error updating chat");
        }
      });

    //   destorty route 
    app.delete("/chats/:id", async (req, res) => {
        try {
          let { id } = req.params;
          let chatToBeDeleted = await Chat.findByIdAndDelete(id);
          console.log(chatToBeDeleted);
          res.redirect("/chats");
        } catch (err) {
          console.error(err);
          res.status(500).send("Error deleting chat");
        }
      });

// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "send me your exam sheets",
//     created_at: new Date()
// });

// chat1.save().then(res => {
//     console.log(res);
// });

app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
