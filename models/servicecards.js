import pool from '../database.js'

export const FetchServiceCards = async () => {
    const result = await pool.query("SELECT * FROM servicecard")
    return result
}

export const FetchServiceCardFromID = async (id) => {
    const result = await pool.query("SELECT * FROM servicecard where id = ?",[id])
    return result
}


export const UpdateServiceCardFromID = async (title,content,iconpath,id) => {
    const result = await pool.query("UPDATE servicecard SET title = ?, content = ?, iconpath = ? WHERE id = ?",[title,content,iconpath,id])
    return result
}

export const UpdateServiceCardFromIDNoImage = async (title,content,id) => {
    const result = await pool.query("UPDATE servicecard SET title = ?, content = ? WHERE id = ?",[title,content,id])
    return result
}

export const AddServiceCard= async (title,content,iconpath) => {
    const result = await pool.query("INSERT INTO servicecard (title, content, iconpath) VALUES (?, ?, ?)",[title, content, iconpath]);
    return result;
}

export const DeleteServiceCard= async (id) => {
    const result = await pool.query("DELETE FROM servicecard WHERE id = ?", [id]);
    return result;
}