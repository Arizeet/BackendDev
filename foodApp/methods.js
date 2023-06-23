const express = require('express');
const app = express();
const userModel = require('./models/userModel');

//middleware func: frontend data -> json
app.use(express.json());    //json data to js objs... //global middleware functn
app.listen(3000);

// let users = [
//     {
//         id: 1,
//         name: "Arizeet"
//     },
//     {
//         id: 2,
//         name: "Purvi"
//     },
//     {
//         id: 3,
//         name: "Zeel"
//     }
// ];

// mini app
const userRouter = express.Router();     //mini app
const authRouter = express.Router();
//base route, router to use
app.use('/user', userRouter);   //global middleware
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUsers)   //path specific middleware
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)

authRouter
    .route('/signup')
    .get(middleware1,getSignUp,middleware2)
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


async function getUsers(req, res) {
    // console.log(req.query);
    // res.send(users);
    let allUsers = await userModel.find();
    let user = await userModel.findOne({name:'Arizeet'});
    res.json({
        message: "list of all users",
        data: allUsers
    })
};

function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data recieved successfully",
        user: req.body
    });
};

async function updateUser(req, res) {
    console.log("req.body->", req.body);
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email:'arizeet@gmail.com'},dataToBeUpdated);
    // for (key in dataToBeUpdated) {
    //     users[key] = dataToBeUpdated[key];
    // }
    res.json({
        message: "data updated successfully",
        data: user
    });
};

async function deleteUser(req, res) {
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message: "data deleted successfully",
        data: user
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

function middleware1(req, res, next){
    console.log("middleware1 encountered");
    next();
}
function middleware2(req, res){
    console.log("middleware2 encountered");
    console.log("middleware2 ended req/res cycle");
    res.sendFile('./foodApp/public/index.html',{root:__dirname});

}

function getSignUp(req,res,next){
    console.log("getSignUp called");
    // res.sendFile('./public/index.html',{root:__dirname});
    next();
};

async function postSignUp(req,res){
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    // console.log('backend',user);
    res.json({
        message: "user signed up",
        data: user
    });
};

