'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

//invocar cec-restapi
const cec_connection = require('./cec-restapi/pam/cec/cec_connector');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/conexionCEC', (req, res) => {

    const elementToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.Entradas ? req.body.result.parameters.Entradas : 'zonulina';
    
    let msg = 'Me has preguntado sobre: ' + elementToSearch;

    //Invocar cec-restapi
    //Obtener content item
    //Variable para recuperar content item y printar al xatbot
     
    const item = cec_connection.invokeFunction(elementToSearch); 

    console.log(item);
    
    return res.json({
            speech: msg,
            displayText: msg,
            source: 'get-respuesta'
    });
});


server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});