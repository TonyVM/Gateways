import { Router } from 'express'
const routerD = Router()
import { deviceController } from '../controllers/devices.controller.js'

// router.get()
routerD.get('/devices/:id', deviceController.getDevice)
routerD.get('/devices', deviceController.getDevices)
// router.post()
routerD.post('/devices', deviceController.addDevice)
// router.put()
routerD.put('/devices/:id', deviceController.updateDevice)
// router.delete()
routerD.delete('/devices/:id', deviceController.deleteDevice)
export default routerD