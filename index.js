'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

//invocar cec-restapi
const cec_connection = require('./cec_connector');

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/conexionCEC', (req, res) => {

let elementToSearch = req.body.result.parameters.Entradas;

if (elementToSearch===""){
    elementToSearch = req.body.result.resolvedQuery;

    elementToSearch = elementToSearch.split(" ");
    const sizeSearch = elementToSearch.length;
    elementToSearch = elementToSearch[sizeSearch-1];

    elementToSearch = elementToSearch.split("?");
    elementToSearch = elementToSearch[0];
};


//Invocar cec-restapi
//Obtener content item
//Variable para recuperar content item y printar al xatbot
const item = cec_connection.invokeFunction(elementToSearch)
    .then(data => {
        res.json({
        speech: data,
        displayText: data,
        source: 'get-respuesta'
        });
    })
    .catch(err => console.log("ERROR: ", err));
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
}); 
