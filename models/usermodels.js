import pool from '../database.js'

//Gets all users where username is ?
export const GetUsersFromUsername = async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = ?",[username])
    return result
}

export const InsertUser = async (name,password,phone,email) => {
    const result = await pool.query("INSERT INTO users (username, password, phone, email) VALUES (?, ?, ?, ?)",[name,password,phone,email])
    return result
}

// export const InsertUser = async (name,password,phone,email) => {
//     const result = await pool.query("INSERT INTO users (username, password, phone, email) VALUES (?, ?, ?, ?)",[name,password,phone,email])
//     return result
// }