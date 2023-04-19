import express from 'express'
import personaRoutes from './routes/persona.routes.js'
import loginRoutes from './routes/login.routes.js'
import indexRoutes from './routes/index.routes.js'
import cors from 'cors'
const app = express()

app.use(cors());
app.use(express.json())
app.use(indexRoutes)
app.use('/api',personaRoutes)
app.use('/api',loginRoutes)

app.use((req,res, next)=>{
    res.status(404).json({
        message:'endpoint not found'
    })
})

app.listen(3000)