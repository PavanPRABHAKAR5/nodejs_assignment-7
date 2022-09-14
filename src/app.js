const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser())

// your code goes here
app.get('/mario', async (req,res)=>{
    try {
      // res.json({status:"Ok"});
        const result = await marioModel.find();
        res.status(200).json(result);
    }catch(err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }

});

app.get('/mario/:id', async (req,res)=>{
  try {
      const id = req.params.id
      const result = await marioModel.find({_id:id});
      res.status(200).json(result);
  }catch(err) {
      res.status(400).json({
          status: "failed",
          message: err.message
      })
  }

});

app.post("/mario", async (req, res) => {
    try {
      // console.log(req.body)
      const data = req.body;
      const result = await marioModel.create(data);
      res.status(201).json(result);
    } catch (e) {
      res.json({
        status: "something error",
        message: e.message,
      });
    }
  });


  
app.patch("/mario/:id", async (req, res) => {
    try {
      let id = req.params.id;
      const result = await marioModel.findOneAndUpdate({ _id: id }, req.body, {new: true});
      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({
          status: "failed",
          message: err.message
      })
    }
  });



app.delete("/mario/:id", async (req, res) => {
    try {
      let id = req.params.id;
      const result = await marioModel.deleteOne({ _id:id}, {new: true});
      res.status(200).json({
        status: "success",
        message: 'character deleted',
      });
    } catch (e) {
      res.status(400).json({
        status: "something error",
        message: e.message,
      });
    }
  });



module.exports = app;


// should handle all the routes
