import {pool} from '../db.js'

export const con = async(req, res) => {
    const result = await pool.query('SELECT NOW()')
    res.json(result[0])
}