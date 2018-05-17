"use strict"

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

                var id_CEC = resp.body.items[0];

                if(id_CEC===undefined){
                    id_CEC="";
                }
                                  
                id_CEC = id_CEC.id;
                console.log("id_CEC------------------->", id_CEC);
                var url = `https://xatbot-node-cec.herokuapp.com/cecAdmin/wp/${id_CEC}`;

                datos_lookup(url)
                    .then(data => {resolve(data)})
                    .catch(err => console.log("ERROR: ", err));
                
            }
        });
    }
);


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

                if(respuesta.body.data ===undefined){
                    respuesta="Esta palabra no se encuentra en nuestro diccionario";
                } else {
                    var entrada_name = (respuesta.body.data.entradaglosario_nombreentrada).toString();
                    var entrada_descr = (respuesta.body.data.entradaglosario_textoentrada).toString();

                    //exportar datos para ser usados en la respuesta a DialogFlow
                    respuesta = "Me has preguntado sobre " + entrada_name + ", esta es la información que tenemos: " + entrada_descr;
                }

                resolve(respuesta); 
            }
        });
    }
);

module.exports = {
    invokeFunction
}; 