import { Router } from 'express'
import { pool } from '../db.js'
import {con} from '../controllers/index.controller.js'

const router = Router()

router.get('/con',con );

export default router