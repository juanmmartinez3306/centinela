import { pool } from "../db.js"
import Jwt from "jsonwebtoken"

export const signup = async (req,res) => {
    const {user,pass,level} = req.body

    const [rows] = await pool.query("SELECT * FROM usuario WHERE user = ?",[user])
    if(Object.keys(rows).length > 0) return res.status(401).send("Usuario ya existente!")
    const [consulta] = await pool.query("INSERT INTO usuario (user,password,privilegio) VALUES (?,?,?)",[user,pass,level])
    res.send("Usuario registrado con exito")
}

export const signin = async (req,res)=> {
    const {user,pass} = req.body

    const [consulta] = await pool.query("SELECT * FROM usuario WHERE user = ? AND password = ?",[user,pass])
    if(Object.keys(consulta).length <= 0) return res.status(401).send("Usuario no encontrado")
    const token = Jwt.sign({__id: consulta[0].id},"secretToken")
    res.json({token:token,message:"success"})
}

function validarToken(req,res,next){
    const token = req.headers.authorization.split(' ')[1]
    if(!req.headers.authorization || token === 'null'){
        return res.status(401).send('unauthorized Request')
    }
    const payload = jwt.verify(token,'secretToken')
    req.userId = payload._id;
    next(); 
}