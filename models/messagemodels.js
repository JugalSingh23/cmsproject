import pool from '../database.js'


export const InsertMessage = async(name,email,phone,message) => {
    const result = await pool.query("INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)",[name,email,phone,message]);
    return result
}

export const FetchMessages = async() => {
    const result = await pool.query("select * from messages");
    return result
}