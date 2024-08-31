import pool from '../database.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { FetchAbout, UpdateAbout, UpdateAboutNoImage } from '../models/aboutmodels.js'
import { FetchContactUs, UpdateContactUs } from '../models/contactusmodels.js'
import { FetchHome, UpdateHome, UpdateHomeNoImage } from '../models/homemodels.js'
import { FetchMessages } from '../models/messagemodels.js'
import { AddServiceCard, DeleteServiceCard, FetchServiceCardFromID, FetchServiceCards, UpdateServiceCardFromID, UpdateServiceCardFromIDNoImage } from '../models/servicecards.js'
import { FetchServices, UpdateServices, UpdateServicesNoImage } from '../models/servicesmodels.js'

export const AdminHome = async (req, res) => {

    return res.render('adminhome')
}

export const GetEditHome = async (req, res) => {
    try {
        return res.sendFile(path.join(__dirname, '../views', 'edithome.html'));
    }
    catch (error) {
        return res.json({ message: 'Error while fetching home data' })
    }
}

export const GetEditHomeAPI = async (req, res) => {
    try {
        const [result] = await FetchHome()
        const rows = result[0]
        return res.send(rows)
    }
    catch (error) {
        return res.json({ message: 'Error while fetching home data' })
    }
}


export const PostEditHome = async (req, res) => {

    try {
        if (req.file) {
            const imagePath = `/images/${req.file.filename}`;
            const [result] = await UpdateHome(req.body.hometitle, req.body.homecontent, imagePath)

        }

        if (!req.file) {

            const [result] = await UpdateHomeNoImage(req.body.hometitle, req.body.homecontent)

        }


        const [result] = await FetchHome()
        const rows = result[0]
        return res.render('edithome', { homedata: rows })
    }
    catch (error) {
        return res.json({ message: 'Error while updating home data', error })
    }
}

export const GetEditAbout = async (req, res) => {

    try {
        const [result] = await FetchAbout()
        const rows = result[0]


        return res.sendFile(path.join(__dirname, '../views', 'editabout.html'));
    }
    catch (err) {
        return res.json({ message: 'Something went wrong while fetching About data', err })
    }
}

export const GetEditAboutApi = async (req, res) => {

    try {
        const [result] = await FetchAbout()
        const rows = result[0]


        return res.send(rows)
    }
    catch (err) {
        return res.json({ message: 'Something went wrong while fetching About data', err })
    }
}

export const PostEditAbout = async (req, res) => {

    try {
        if (req.file) {
            const imagePath = `/images/${req.file.filename}`;
            const [result] = await UpdateAbout(req.body.abouttitle, req.body.aboutcontent, imagePath)

        }

        if (!req.file) {

            const [result] = await UpdateAboutNoImage(req.body.abouttitle, req.body.aboutcontent)

        }


        const [result] = await FetchAbout()
        const rows = result[0]
        return res.render('editabout', { aboutdata: rows })
    }
    catch (err) {
        return res.json({ message: 'SOmething went wrong while updating About', err })
    }

}


export const GetEditServices = async (req, res) => {
    try {


        return res.sendFile(path.join(__dirname, '../views', 'editservices.html'));
    }
    catch (err) {
        return res.json({ message: 'Could not fetch Services data', err })
    }

}

export const GetEditServicesAPI = async (req, res) => {
    try {

        const id = req.params.id
        const [result] = await FetchServices()
        const rows = result[0]


        return res.send(rows)
    }
    catch (err) {
        return res.json({ message: 'Could not fetch Services data', err })
    }

}

export const PostEditServices = async (req, res) => {

    try {
        if (req.file) {
            const imagePath = `/images/${req.file.filename}`;
            const [result] = await UpdateServices(req.body.servicestitle, req.body.servicescontent, imagePath)
        }

        if (!req.file) {

            const [result] = await UpdateServicesNoImage(req.body.servicestitle, req.body.servicescontent)
        }


        const [result] = await FetchServices()
        const rows = result[0]
        return res.render('editservices', { servicesdata: rows })
    }
    catch (error) {
        return res.json({ message: 'Could not update services', error })
    }

}

export const GetEditContactUs = async (req, res) => {

    try {

        return res.sendFile(path.join(__dirname, '../views', 'editcontactus.html'));
    }
    catch (error) {
        return res.json({ message: 'Error while fetching contactus data', error })
    }

}

export const GetEditContactUsAPI = async (req, res) => {

    try {

        const [result] = await FetchContactUs()
        const rows = result[0]


        return res.send(rows)
    }
    catch (error) {
        return res.json({ message: 'Error while fetching contactus data', error })
    }

}

export const PostEditContactUs = async (req, res) => {
    try {
        console.log("axios post request on contactus")
        console.log(req.body)
        const [result2] = await UpdateContactUs(req.body.address, req.body.email1, req.body.email2, req.body.phone1, req.body.phone2, req.body.workhourstart, req.body.workhourend, req.body.workdaystart, req.body.workdayend)

        const [result] = await FetchContactUs()
        const rows = result[0]
        return res.render('editcontactus', { contactusdata: rows })
    }
    catch (error) {
        return res.json({ message: 'Something went wrong while updating contact us' })
    }

}

export const GetServiceCards = async (req, res) => {

    try {

        return res.sendFile(path.join(__dirname, '../views', 'viewservicecards.html'));
    }
    catch (error) {
        return res.json({ message: 'Could not fetch service cards' })
    }
}

export const GetServiceCardsAPI = async (req, res) => {

    try {
        const [result] = await FetchServiceCards()
        const rows = result

        return res.send(rows)
    }
    catch (error) {
        return res.json({ message: 'Could not fetch service cards' })
    }
}

export const GetEditServiceCard = async (req, res) => {

    try {
        const servicecardid = req.params.id
        return res.sendFile(path.join(__dirname, '../views', 'editservicecard.html'));
    }
    catch (error) {
        return res.json({ message: 'Error while fetching service card data' })
    }

}

export const GetEditServiceCardAPI = async (req, res) => {

    try {
        const servicecardid = req.params.id

        const [result] = await FetchServiceCardFromID(servicecardid)
        const rows = result[0]

        return res.send(rows)
    }
    catch (error) {
        return res.json({ message: 'Error while fetching service card data' })
    }

}


export const PostEditServiceCard = async (req, res) => {

    try {
        console.log("Axios post request check")
        console.log("This is the request body below :")
        console.log(req.body)


        const servicecardid = req.params.id
        console.log(req.file)
        if (req.file) {
            console.log('Heading inside req.file true condition')
            const iconpath = `/images/${req.file.filename}`;
            const [result] = await UpdateServiceCardFromID(req.body.servicecardtitle, req.body.servicecardcontent, iconpath, req.params.id)
        }

        if (!req.file) {

            console.log("It is heading inside the !reqfile condition")
            const [result] = await UpdateServiceCardFromIDNoImage(req.body.servicecardtitle, req.body.servicecardcontent, req.params.id)
        }



        console.log('res.redirect here')
        return res.redirect('/viewservicecards')
    }

    catch (error) {
        return res.json({ message: 'Error while updating service card' })
    }

}

export const GetAddServiceCard = async (req, res) => {


    return res.sendFile(path.join(__dirname, '../views', 'addservicecard.html'));
}

export const PostAddServiceCard = async (req, res) => {
    try {
        console.log("axios post check")
        if (req.file) {
            const iconpath = `/images/${req.file.filename}`;
            const [result] = await AddServiceCard(req.body.servicecardtitle, req.body.servicecardcontent, iconpath)
        }

        return res.redirect('/viewservicecards')
    }
    catch (error) {
        return res.json({ message: 'error while adding service card' })
    }
}

export const DeleteTheServiceCard = async (req, res) => {

    try {
        const servicecardid = req.params.id;

        const [result] = await DeleteServiceCard(servicecardid)

        const [result2] = await FetchServiceCards()
        const rows = result2

        return res.render('viewservicecards', { message: 'Record Deleted', servicecardsdata: rows })
    }
    catch (error) {
        return res.json({ message: 'error while deleting the service card' })
    }

}

export const GetViewMessages = async (req, res) => {


    return res.sendFile(path.join(__dirname, '../views', 'viewmessages.html'));

}

export const GetViewMessagesAPI = async (req, res) => {
    try {
        const [result] = await FetchMessages()
        console.log(result)
        return res.send(result)
    }
    catch (error) {
        return res.json({ message: 'error while retrieving messages' })
    }

}