const express = require('express');
const app = express();
//middleware func: frontend data -> json
app.use(express.json());
app.listen(3000);

let users = [
    {
        id: 1,
        name: "Arizeet"
    },
    {
        id: 2,
        name: "Purvi"
    },
    {
        id: 3,
        name: "Zeel"
    }
];
//mini app
const userRouter = express.Router();
const authRouter = express.Router();
//base route, router to use
app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)

authRouter
    .route('/signup')
    .get(getSignUp)
    .post(postSignUp)

// app.get('/user');
// app.post('/user');
// //for update we use patch
// app.patch('/user');
// //to delete a data
// app.delete('/user');
// //params
// app.get('/user/:username',(req,res)=>{
//     console.log(req.params.username);
//     console.log(req.params);
//     res.send("user id recieved");
// });


function getUser(req, res) {
    console.log(req.query);
    res.send(users);
};

function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data recieved successfully",
        user: req.body
    });
};

function updateUser(req, res) {
    console.log("req.body->", req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated successfully"
    });
};

function deleteUser(req, res) {
    users = {};
    res.json({
        message: "data deleted successfully"
    });
};

function getUserById(req, res) {
    console.log(req.params.id);
    let paramsId = req.params.id;
    let obj = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] == paramsId) {
            obj = users[i];
        }
    }
    res.json({
        message: "request recieved",
        data: obj
    })
};

function getSignUp(req,res){
    res.sendFile('./public/index.html',{root:__dirname});
};

function postSignUp(req,res){
    let obj = req.body;
    console.log('backend',obj);
    res.json({
        message: "user signed up",
        data: obj
    });
};