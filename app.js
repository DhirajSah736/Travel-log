var express=require('express')
var app = express();
var path =require('path');
var bodyParser = require('body-parser')
const mongoose=require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));

const url="mongodb+srv://Dhiraj456:Dhiraj456@cluster0.ilrlg.mongodb.net/pin?retryWrites=true&w=majority"

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

const OrderformSchema = new mongoose.Schema({
    data:Object,
},
    {
    collection: "Booked Packages"
    }
);


const OForm = mongoose.model("OForm", OrderformSchema);



const OformData = (bodyData) =>{
    OForm ({data: bodyData}). save((err)=>{
        if(err){
            throw err;
        }
    });
};


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname,"public")));

app.get('/', function(req,res){
    res
        .status(200)
        .sendFile(path.join(__dirname,"public","index.html"));    
});
app.get('/Thank_you', function(req,res){
    res
        .status(200)
        .sendFile(path.join(__dirname,"public","ThankU.html"));    
});
app.get('/Form', function(req,res){
    res
        .status(200)
        .sendFile(path.join(__dirname,"public","form.html"));    
});

app.post('/', function(req,res){
    OformData(req.body);
    res.redirect('/Form');    
});
app.post('/Form', function(req,res){
    OformData(req.body);
    res.redirect('/Thank_you');    
});

app.listen(2000, function(){
    console.log("We are listning at port 2000....");
})