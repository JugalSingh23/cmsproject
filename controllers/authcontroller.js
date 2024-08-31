import pool from '../database.js'
import {GetUsersFromUsername,InsertUser} from '../models/usermodels.js'

export const GetRegister = async (req, res) => {
   
    return res.render('register', {message : ''})
}

export const PostRegister = async (req, res) => {
   
    if (req.body.password != req.body.passwordconfirm) {
        return res.render('register', { message: 'passwords do not match' })
    }

    if (req.body.password.length < 8) {
        return res.render('register', { message: 'Password should be at least 8 characters' })
    }
    

    const [rows] = await GetUsersFromUsername(req.body.name)
    console.log(rows)

    if (rows.length > 0) {
        return res.render('register', { message: 'Username taken' })
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z]).+$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.render('register', { message: 'Password should contain at least one letter, one number, and one capital letter' });
        }
    
        else {
            await InsertUser(req.body.name, req.body.password, req.body.phone, req.body.email)
    return res.render('login', {message : 'Registration Successful'})
}
return res.render('register')
}


export const GetLogin = async (req, res) => {
   
    return res.render('login',{message : ''})
}

export const PostLogin = async (req, res) => {
   
    const result = await GetUsersFromUsername(req.body.name)
    if (result[0].length === 0) {
        console.log("No username exists");
        return res.render('login', { message: 'No username exists' }); 

    }

    const user = result[0][0];

    if (user.password === req.body.password) {

        console.log('Login success')
        req.session.user = user;
        return res.redirect('/admin');
    }
    else {
        console.log('Incorrect password');
        return res.render('login', { message: 'Incorrect Password' });
    }

    return res.render('login',{message : ''})
}


export const PostLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("Error during logout:", err);
            return res.redirect('/admin');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
}
