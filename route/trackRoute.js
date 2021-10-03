const express = require('express');
const router = express.Router();
const Track = require('../model/track_model');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//add ticket
router.post('/add/plan',  function (req, res) {
    const errors = validationResult(req);
    console.log("requested")
    if (errors.isEmpty()) {
        const act = req.body.act;
        const description = req.body.description;
        const date = req.body.date;
        const start = req.body.start;
        const end=req.body.end;
        const priority = req.body.priority;
            const store = new Track({ act: act, description: description, date: date,start:start, end: end,priority:priority});
            store.save().then(function (result) {
                console.log(result)
                res.status(200).json({ success: true, message: "Activity added successfully",data:result }) 
            }).catch(function (error) {
                res.status(500).json({ err: error })
            })
    }
    else {
        res.status(201).json(errors.array());
    }
})



//updating the ticket details
router.put('/update/plan/:id', function(req, res) {
    const act = req.body.act;
    const description = req.body.description;
    const date = req.body.date;
    const start = req.body.start;
    const end=req.body.end;
    const priority = req.body.priority;
        Track.updateOne({ _id: id },{ act: act, description: description, date: date,start:start, end: end,priority:priority})
            .then(function(re) {
              res.status(200).json({ message: "updated" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
   
})


//fetches single ticket
  router.get("/getItem/:id",function(req,res)
  {
    const id=req.params.id;
    Track.findOne({_id:id}).then(function(data)
    {
        res.status(200).json(data)
    })
    .catch(function(e)
    {
        res.status(500).json({err:e})
    })
  })

//delete ticket
    router.delete("/delete/item/:id", function(req,res)
    {

        const id=req.params.id;
        Track.deleteOne({_id:id}).then(function(result)
        {
            res.status(200).json({message:"Deleted"})
        })
        .catch(function(e)
        {
            res.status(500).json({error:e})
        })
      })
    

  
//display all tickets for both admin and customers
router.get("/show/tickets/",function(req,res)
{

    Track.find().then(function(data)
    {
        
        res.status(200).json({success:true,data })
    })
    .catch(function(e)
    {
        res.status(500).json({err:e})
    })
  })

module.exports = router;