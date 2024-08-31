import pool from '../database.js'


export const FetchContactUs = async () => {
    const result = await pool.query("SELECT * FROM contactus")
    return result
}

export const UpdateContactUs = async (address,email1,email2,phone1,phone2,workhourstart,workhourend,workdaystart,workdayend) => {
    const result = await pool.query("UPDATE contactus SET address = ?, email = ?, phone = ?, workhours = ?, workdays = ? WHERE id = 1",[address,email1+','+email2,phone1+','+phone2,workhourstart+','+workhourend,workdaystart+','+workdayend])
        return result
}