import pool from '../database.js'


export const FetchAbout = async () => {
    const result = await pool.query("SELECT * FROM about")
    return result
}

export const UpdateAbout = async (title,content,imagepath) => {
    const result = await pool.query("UPDATE about SET title = ?, content = ?, imagepath = ? WHERE id = 1",[title,content,imagepath])
        return result
}

export const UpdateAboutNoImage = async (title,content) => {
    const result = await pool.query("UPDATE about SET title = ?, content = ? WHERE id = 1",[title,content])
        return result
}