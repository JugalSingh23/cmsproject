import pool from '../database.js'


export const FetchHome = async () => {
    const result = await pool.query("SELECT * FROM home")
    return result
}

export const UpdateHome = async (title,content,imagepath) => {
    const result = await pool.query("UPDATE home SET title = ?, content = ?, imagepath = ? WHERE id = 1",[title,content,imagepath])
        return result
}

export const UpdateHomeNoImage = async (title,content) => {
    const result = await pool.query("UPDATE home SET title = ?, content = ? WHERE id = 1",[title,content])
        return result
}