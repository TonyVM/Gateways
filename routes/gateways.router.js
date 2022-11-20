import { Router } from 'express'
const routerG = Router()
import { gatewaysController } from '../controllers/gateways.controller.js'

// router.get()
routerG.get('/gateways/:id', gatewaysController.getGateway)
routerG.get('/gateways', gatewaysController.getGateways)
// router.post()
routerG.post('/gateways', gatewaysController.addGateway)
routerG.post('/gateways/gatew', gatewaysController.addDevice)
// router.put()
routerG.put('/gateways/:id', gatewaysController.updateGateway)
routerG.put('/gateways/:g_id/add/device/:d_id', gatewaysController.addDevice)
routerG.put('/gateways/:g_id/remove/device/:d_id', gatewaysController.removeDevice)
// router.delete()
routerG.delete('/gateways/:id', gatewaysController.deleteGateway)
export default routerG