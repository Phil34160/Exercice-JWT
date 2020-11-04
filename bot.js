const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');
app.use(bodyParser.json());

// let token ="";

// automatisation du post et du get

setInterval(() => {
    
 axios.post('http://localhost:3000/login',{
    username : 'john',
    password : 'password123admin'
    })
    .then(res =>{
        // token = res.data.accessToken;
        console.log(res.data.accessToken)
        axios.get('http://localhost:4000/books',{
            headers :{"authorization": `Bearer ${res.data.accessToken}`}
        })
        .then(res =>{
            console.log(res.data);
        })
        .catch(err =>{
            console.error(err);
        })
    })
    .catch(err =>{
        console.error(err);
    })
}, 10000, 0);

// ajout automatique de livres
let i = 0;
setInterval(() => {
    axios.post('http://localhost:3000/login',{
    username : 'john',
    password : 'password123admin'
    })
    .then(res=>{
        axios.post('http://localhost:4000/books',{
            author : `${i}`,  // or new Date().getTime()  {now() fonctionne pour remplir une colonne sql}
            country : `${i}`,
            language : `${i}`,
            pages : `${i}`,
            title : `${i}`,
            year : new Date().toString()
        },{ headers :{"authorization": `Bearer ${res.data.accessToken}`}})
    })
    .catch(res=>{

    })
    i++;
}, 10001, 0);

app.listen(5000, () => {
    console.log('Bot service started on http://localhost:5000');
});