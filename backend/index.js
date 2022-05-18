const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

const url="mongodb+srv://Dhiraj456:Dhiraj456@cluster0.ilrlg.mongodb.net/pin?retryWrites=true&w=majority"

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(()=>{
    console.log("Mongodb connected");
})
.catch((err)=>console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
