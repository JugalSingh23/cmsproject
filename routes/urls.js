import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer'

import { GetAbout, GetAboutAPI, GetContactus, GetHome, GetServices, PostContactus } from '../controllers/maincontroller.js';
import {GetRegister,GetLogin, PostRegister, PostLogin, PostLogout } from '../controllers/authcontroller.js';
import {AdminHome,GetEditHome,PostEditHome,GetEditAbout,PostEditAbout, GetEditServices, PostEditServices,GetEditContactUs,PostEditContactUs,GetServiceCards,GetEditServiceCard, PostEditServiceCard,GetAddServiceCard,PostAddServiceCard,DeleteTheServiceCard,GetViewMessages, GetViewMessagesAPI, GetEditHomeAPI, GetEditAboutApi, GetEditServicesAPI, GetEditContactUsAPI, GetServiceCardsAPI, GetEditServiceCardAPI} from '../controllers/admincontroller.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const imagePath = path.join(__dirname,'../public/images');
        return cb(null,imagePath)
    },
    filename: function(req,file,cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },  
});

const upload = multer({ storage });


//Authentication middleware

export const isAuthenticated = (req, res, next) => {
  
    if (req.session.user) { 
        return next(); 
    }
    // If not authenticated, redirect to login page
    return res.redirect('/login');
};



//routes
router.get('/',GetHome );
router.get('/services',GetServices );
router.get('/about',GetAbout );
router.get('/aboutapi',GetAboutAPI );

router.get('/contactus',GetContactus );
router.post('/contactus',PostContactus)

//authorization routes
router.get('/register',GetRegister);
router.post('/register',PostRegister);

router.get('/login',GetLogin);
router.post('/login',PostLogin);

//admin dashboard
router.get('/admin',isAuthenticated,AdminHome );

//Home edits
router.get('/edithome',isAuthenticated,GetEditHome );
router.post('/edithome',upload.single("homebanner"),PostEditHome );
router.get('/edithomeapi',GetEditHomeAPI)

//About edits
router.get('/editabout',isAuthenticated,GetEditAbout );
router.post('/editabout',upload.single("aboutbanner"),PostEditAbout );
router.get('/editaboutapi',GetEditAboutApi)

//Services edits
router.get('/editservices',isAuthenticated,GetEditServices );
router.post('/editservices',upload.single("servicesbanner"),PostEditServices );
router.get('/editservicesapi/',GetEditServicesAPI );

//contactus edits
router.get('/editcontactus',isAuthenticated,GetEditContactUs );
router.post('/editcontactus',PostEditContactUs );
router.get('/editcontactusapi',GetEditContactUsAPI)

//view service cards
router.get('/viewservicecards',isAuthenticated,GetServiceCards);
router.get('/viewservicecardsapi',GetServiceCardsAPI);


//edit service cards
router.get('/editservicecard/:id',isAuthenticated,GetEditServiceCard);
router.post('/editservicecard/:id',upload.single("servicecardicon"),PostEditServiceCard);
router.get('/editservicecardAPI/:id',GetEditServiceCardAPI);


//add service card
router.get('/addservicecard',isAuthenticated,GetAddServiceCard)
router.post('/addservicecard',upload.single("servicecardicon"),PostAddServiceCard)

//delete service card
router.get('/deleteservicecard/:id',isAuthenticated,DeleteTheServiceCard);

// view messages
router.get('/viewmessages',isAuthenticated,GetViewMessages);
router.get('/viewmessagesapi',GetViewMessagesAPI);



//logout
router.post('/logout',PostLogout)



export default router;