const express = require('express');
const app = express();

app.listen(3000);
//using absolute path
app.get('/',(req, res)=>{
    res.sendFile('D:/BackEnd/views/index.html');
});
//using relative path
app.get('/about',(req, res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
});
//redirect
app.get('/about-us',(req, res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
});

app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
});