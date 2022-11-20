import express from 'express'
import morgan from 'morgan'
import router from './routes/router.js'
import cors from 'cors'
import { config } from 'dotenv'
config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.set("port", process.env.SERVER_PORT || 4601)

app.use('/api', router)
app.get('/', (req, res) => {
   res.send(
      "Wellcome to Gateways API"
   )
})
export default app