"use strict"

const log4js = require('log4js');
const logger = log4js.getLogger();
const express = require('express');
const request = require('request');
const urllib = require('urllib');

const invokeFunction = (elementToSearch) => new Promise((resolve, reject) => {
urllib.request(`https://xatbot-node-cec.herokuapp.com/cecAdmin/search`,
{ 
method: 'POST',
auth: "oracle:welcome1",
headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},
data: {
"type": "EntradaGlosario",
"name": elementToSearch 
}
}, function (err, data, res) {
if (err) {
reject(err);
console.log("ERROR---->: ", err);
} else {
var buffer = Buffer.from(new Uint8Array(data));

var resp = JSON.parse(buffer.toString());

var id_CEC = '';
if (resp.body.items[0].id) {
id_CEC = resp.body.items[0].id;
} else {
id_CEC = '';
}
console.log("id_CEC------------------->", id_CEC);
var url = `https://xatbot-node-cec.herokuapp.com/cecAdmin/wp/${id_CEC}`;

datos_lookup(url)
.then(data => {resolve(data)})
.catch(err => console.log("ERROR: ", err));

}
});
});

const datos_lookup = (url) => new Promise((resolve, reject) => {
urllib.request(url,
{
method: 'GET',
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
},
}, function (err, data) {
if (err) {
reject(err);
console.log("ERROR datos_lookup: ", err);
} else {
var respuesta = JSON.parse(data);

//var entrada_name = (respuesta.body.data.entradaglosario_nombreentrada).toString();
var entrada_descr = (respuesta.body.data.entradaglosario_textoentrada).toString();
;
//var entrada_photo = (respuesta.body.data.entradaglosario_fotoentrada);
console.log(entrada_descr);
//exportar datos para ser usados en la respuesta a DialogFlow
resolve(entrada_descr); 
}
});

});

module.exports = {
invokeFunction
}; 