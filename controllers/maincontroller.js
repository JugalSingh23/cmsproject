import pool from '../database.js'
import { FetchAbout } from '../models/aboutmodels.js'
import { FetchContactUs } from '../models/contactusmodels.js'
import {FetchHome} from '../models/homemodels.js'
import { InsertMessage } from '../models/messagemodels.js'
import { FetchServiceCards } from '../models/servicecards.js'
import { FetchServices } from '../models/servicesmodels.js'

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const GetHome = async (req, res) => {
   
    const [result] = await FetchHome()
    const rows = result[0]

    const [result2] = await FetchAbout()
    const rows2 = result2[0]

    const [result3] = await FetchContactUs()
    const rows3 = result3[0]

    const [result4] = await FetchServiceCards()
    const rows4 = result4
    console.log(rows4)

    return res.sendFile(path.join(__dirname, '../views', 'home.html'));
}

export const GetServices = async (req, res) => {


    return res.sendFile(path.join(__dirname, '../views', 'services.html'));
}

export const GetAbout = async (req, res) => {
   
    return res.sendFile(path.join(__dirname, '../views', 'about.html'));
}

export const GetAboutAPI = async (req, res) => {
   
    const [result] = await FetchAbout()
    const rows = result[0]

    return res.send(rows)
}

export const GetContactus = async (req, res) => {
   


    return res.sendFile(path.join(__dirname, '../views', 'contactus.html'));

}

export const PostContactus = async (req, res) => {
   
    const [result2] = await InsertMessage(req.body.name,req.body.email,req.body.phone,req.body.message)
    
    const [result] = await FetchContactUs()
    const rows = result[0]
    console.log(rows)

    return res.render('contactus',{contactusdata:rows,message : 'Your message was received'})

}