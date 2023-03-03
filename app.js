const bodyParser = require('body-parser');
const express=require('express');
const cors=require('cors')
const app=express();

const {mongoose}=require('./DB/mongoose');
// const bodyParser=require('body-parser');

//load in mongoose models
const {List,Task}=require('./DB/models/index');
app.use(cors())
//load middleware
app.use(bodyParser.json());
//core headers middleware
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested_With, Content-type, Accept");
    next();
})


// route handlers
//list route
//GET
/*purpose: get all items*/
app.get('/lists',(req,res)=>{
    //we want to return an array of all lists in database.
    List.find().then((lists)=>{
        res.send(lists);
    }).catch((e)=>{
        res.send(e);
    });
})

//post
//purpose: create all lists
app.post('/lists',(req,res)=>{
    //we want to create a new lists and return the new list document back to the user which includes id.
    //the list information (field) will paased in via json request body.
    let title=req.body.title;
    let newList=new List({
        title
    });
    newList.save().then((listDoc)=>{
        //the full list document is returned including ID
        res.send(listDoc);
    })
})

/*
patch
purpose: update a specified list
*/
app.patch('/lists/:id',(req,res)=>{
    //we want to update the specified list (list document with id in the url) with the value specified in the json body of the request.
    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
    
});

/*
delete
purpose: Delete a specified lists
*/

app.delete('/lists/:id',(req,res)=>{
    //we want to delete a specified list in the database.
    List.findOneAndDelete({_id:req.params.id}).then((removedListDoc)=>{
        res.send(removedListDoc)
    });
});


 

//GET /lists/:listID/tasks
/*purpose: get all tasks in a specified list*/
app.get('/lists/:listId/tasks',(req,res)=>{
    //we want to return all tasks that belongs to a specified list in database.
    Task.find({
        _listId:req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.send(e);
    });
})

//post
//purpose: create a new tasks in a list specified by listId
app.post('/lists/:listId/tasks',(req,res)=>{
    //we want to create a new tasks and return the new task document back to the user which includes id.
    //the list information (field) will paased in via json request body.
    let newTask=new Task({
        title:req.body.title,
        _listId:req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        //the full list document is returned including ID
        res.send(newTaskDoc);
    })
})

/*
patch
purpose: update a specified list
*/
app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    //we want to update the specified list (list document with id in the url) with the value specified in the json body of the request.
    Task.findOneAndUpdate({_id: req.params.taskId,
    _listId:req.params.listId
},{
        $set: req.body
    }).then(()=>{
        res.send({status:"ok"});
    });
    
});

/*
delete
purpose: Delete a specified lists
*/

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    //we want to delete a specified list in the database.
    Task.findOneAndRemove({_id:req.params.taskId, _listId:req.params.listId}).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    });
});

app.listen(3000,()=>{
    console.log('The server is listening on port 3000');
});