const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const admin = require('../middleware/admin')
const worker = require('../middleware/worker')
const Sms = require('../../00_db/models/sms')
var request = require('request');
const formData = require('form-data');
const fetch = require("node-fetch");
const xml2js = require('xml2js');

// Send sms
router.post('/sms', async(req, res) => {
    message = req.body.message
    recipients = req.body.userDetails

    XMLString = `<SMS><USERNAME>312284235</USERNAME><PASSWORD>203040</PASSWORD><SENDER_PREFIX>ALFA</SENDER_PREFIX><SENDER_SUFFIX>0537771686</SENDER_SUFFIX><MSGLNG>HEB</MSGLNG><MSG>${message}</MSG><MOBILE_LIST>`
    for (let user of recipients){
        XMLString += `<MOBILE_NUMBER>0${user.telephone}</MOBILE_NUMBER>`
    }
    XMLString += '</MOBILE_LIST><UNICODE>False</UNICODE><USE_PERSONAL>False</USE_PERSONAL></SMS>'
    const url = "https://www.smsapi.co.il/Web_API/SendSMS.asmx/SUBMITSMS?XMLString=";
    const response = await fetch(encodeURI(url + XMLString), { method: 'GET'});

    const sms = new Sms(req.body)
    try {
        await sms.save()
        res.status(201).send(sms)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Send sms to number phone
router.post('/sms/:number', async(req, res) => {
    message = req.body.message
    number = req.params.number

    XMLString = `<SMS><USERNAME>312284235</USERNAME><PASSWORD>203040</PASSWORD><SENDER_PREFIX>ALFA</SENDER_PREFIX><SENDER_SUFFIX>0537771686</SENDER_SUFFIX><MSGLNG>HEB</MSGLNG><MSG>${message}</MSG><MOBILE_LIST>`
    XMLString += `<MOBILE_NUMBER>${number}</MOBILE_NUMBER>`
    XMLString += '</MOBILE_LIST><UNICODE>False</UNICODE><USE_PERSONAL>False</USE_PERSONAL></SMS>'
    const url = "https://www.smsapi.co.il/Web_API/SendSMS.asmx/SUBMITSMS?XMLString=";
    const response = await fetch(encodeURI(url + XMLString), { method: 'GET'});

    const sms = new Sms(req.body)
    try {
        await sms.save()
        res.status(201).send(sms)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Get Credit sms
router.get('/sms/credit', async(req, res) => {    
    XMLString = `<SMS><CMD>CREDITS</CMD><USERNAME>312284235</USERNAME><PASSWORD>203040</PASSWORD></SMS>`
    const url = "https://www.smsapi.co.il/Web_API/SendSMS.asmx/COMMANDS?XMLString=";
    const credit = fetch(encodeURI(url + XMLString), { method: 'GET'}).then(response => response.text())
    .then(str => {
        xml2js.parseString(str, (err, result) => {
            if(err) {
                throw err;
            }

            let credit = {credit : parseInt(result.string._.replace(/[^0-9\.]/g, ''), 10)}
            try {
                res.status(201).send(credit)
            } catch (err) {
                console.log(err)
                res.status(400).send(err)
            }          
        });
    })
})

module.exports = router