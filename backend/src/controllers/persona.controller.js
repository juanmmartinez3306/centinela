import { pool } from "../db.js"
export const getPersona = async (req, res) => {

    try {
        const [rows] =  await pool.query('SELECT id,nombre,DATE_FORMAT(Fnacimiento, "%d/%m/%Y") AS fecha,direccion,localidad,genero FROM persona')
        res.send({rows})
    } catch (error) {
        res.sendStatus(500).json({
            message:"Something goes wrong"
        })
    }

}

export const guardarPersona = async (req, res) => {

    try {
        const {Nombre, Direccion, Fnacimiento, Localidad, Genero,Foto} = req.body
        const [rows] =  await pool.query('INSERT INTO persona (`nombre`, `direccion`, `Fnacimiento`, `localidad`, `genero`, `fotografia`) VALUES (?,?,?,?,?,?)',
        [Nombre,Direccion,Fnacimiento,Localidad,Genero,Foto])
        res.send(rows)
    } catch (error) {
        res.sendStatus(500).json({
            message:"Something goes wrong"
        })
    }
}

export const actualizarPersona = async (req, res) => {

    try {
        const {id,Nombre, Direccion, Fnacimiento, Localidad, Genero,Foto} = req.body
        const [result] =  await pool.query('UPDATE `persona` SET nombre = IFNULL(?,nombre), direccion = IFNULL(?,direccion),Fnacimiento = IFNULL(?,Fnacimiento), localidad = IFNULL(?,localidad), genero = IFNULL(?,genero), fotografia = IFNULL(?,fotografia) WHERE `persona`.`id` = ?',
        [Nombre,Direccion,Fnacimiento,Localidad,Genero,Foto,id])
        
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Persona no encontrada'
        })
    
        res.send("Usuario actualizado con exito")
    } catch (error) {
        res.sendStatus(500).json({
            message:"Something goes wrong"
        })
    }

}

export const borrarPersona = async (req, res) => {
    try {
        const {id} = req.body
        const [result] =  await pool.query('DELETE FROM persona WHERE id = ?',[id])
        
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Persona no encontrada'
        })
    
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500).json({
            message:"Something goes wrong"
        })
    }
}

