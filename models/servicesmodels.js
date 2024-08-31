import pool from '../database.js'


export const FetchServices = async () => {
    const result = await pool.query("SELECT * FROM services")
    return result
}

export const UpdateServices = async (title,content,imagepath) => {
    const result = await pool.query("UPDATE services SET title = ?, content = ?, imagepath = ? WHERE id = 1",[title,content,imagepath])
        return result
}

export const UpdateServicesNoImage = async (title,content) => {
    const result = await pool.query("UPDATE services SET title = ?, content = ? WHERE id = 1",[title,content])
        return result
}