import { Router } from 'express'
import { getPersona,guardarPersona,actualizarPersona,borrarPersona } from '../controllers/persona.controller.js'

const router = Router()

router.get('/personas',getPersona)

router.post('/personas',guardarPersona)

router.put('/personas',actualizarPersona)

router.delete('/personas',borrarPersona)

export default router