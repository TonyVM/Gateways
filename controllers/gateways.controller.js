import { json } from "express";
import { stringify } from "uuid";
import { getConnectionMySQL } from "../database/mysql.js";


const addGateway = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      // const { serial_number, name, ipv4_address, devices } = req.body
      const { serial_number, name, ipv4_address } = req.body
      const gateway = {
         serial_number, name, ipv4_address
      }
      if (serial_number === undefined || serial_number === '' ||
         name === undefined || name === '' || ipv4_address === undefined || ipv4_address === '') {
         res.status(400).json({ message: "Bad request. Please fill all fields" })
      } else {
         const check = await connection.query("SELECT serial_number FROM gateways WHERE serial_number = ?", serial_number)

         if (check.length !== 0) {
            res.json({ "message": `There is already a record with provided serial number: ${serial_number}. Please provide a different one` })
         } else {
            await connection.query("INSERT INTO gateways SET ?", gateway)
            res.json("Gateway added")
         }
      }
   } catch (error) {
      res.status(500).send(error)
   }
}

const getGateways = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      const result = await connection.query("SELECT * FROM gateways")
      console.log(JSON.parse(JSON.stringify(result)))
      res.json(result)
   } catch (error) {
      res.status(500).send(error)
   }
}
/*
const getGateways = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      const result = await connection.query("SELECT * FROM gateways")
      console.log(JSON.parse(JSON.stringify(result)))
      res.json(result)
   } catch (error) {
      res.status(500).send(error)
   }
}
*/

const getGateway = async (req, res) => {
   try {
      const { id } = req.params
      const connection = await getConnectionMySQL()
      const result = await connection.query("SELECT * FROM gateways WHERE g_id = ?", id)

      if (result.length > 0) res.json(result)
      else res.json({ message: `There is no record on table with provided id` })
   } catch (error) {
      res.status(500).send(error)
   }
}

const deleteGateway = async (req, res) => {
   try {
      const { id } = req.params
      const connection = await getConnectionMySQL()
      const result = await connection.query(`DELETE FROM gateways WHERE g_id = ?`, id)

      if (result.affectedRows > 0) {
         res.json(`Record successfully deleted`)
         console.log(result)
      }
      else {
         res.json(`There is no record on table with provided id: ${id}`)
      }
   } catch (error) {
      res.status(500).send(error)
   }
}

const updateGateway = async (req, res) => {
   try {
      const { id } = req.params
      // const { name, ipv4_address, devices } = req.body
      const { name, ipv4_address } = req.body
      const connection = await getConnectionMySQL()
      if (id === undefined || name === undefined || name === '' ||
         ipv4_address === undefined || ipv4_address === '') {
         res.status(400).json({ message: "Bad request. Please fill all fields" })
      } else {
         // const getDevicesIn = await connection.query(`Select devices from gateways where g_id = ?`, id)
         // const arrayDevices = [...getDevicesIn].map( d => {
         //    return d.devices
         // })
         // console.log(getDevicesIn.devices)
         // console.log('Device param:', devices)
         // console.log('Value of array devices: ', arrayDevices.length)
         // arrayDevices.push(devices.toString())
         // console.log(arrayDevices)


         // const result = await connection.query(`UPDATE gateways SET name = ?, ipv4_address = ?, devices = ? WHERE g_id = ?`, [ name, ipv4_address, arrayDevices, id])
         const result = await connection.query(`UPDATE gateways SET name = ?, ipv4_address = ? WHERE g_id = ?`, [name, ipv4_address, id])
         console.log(result)
         if (result.affectedRows > 0) {
            res.json(`Gateway data successfully updated`)
         }
         else {
            res.json(`There is no record on table with provided id: ${id}`)
         }
      }
   } catch (error) {
      res.status(500).send(error)
   }
}

const addDevice = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      const { g_id, d_id } = req.params
      const check = await connection.query("SELECT gateway_id from devices where id = ?", d_id)      
      if (JSON.parse(JSON.stringify(check))[0].gateway_id === null) {
         await connection.query("UPDATE devices SET gateway_id = ? Where id = ?", [g_id, d_id])
         res.status(200).json(`Peripheral device correctly added to Gateway with id: ${g_id}`)
      } else {
         g_id == JSON.parse(JSON.stringify(check))[0].gateway_id ?
            res.json(`Peripheral Device has been already added to this Gateway. ID: ${g_id}`) :
            res.json(`Peripheral Device has been already added to Gateway with id ${JSON.parse(JSON.stringify(check))[0].gateway_id}`)
      
      }      
   } catch (error) {
      res.status(500).send(error.message)
   }
}

const removeDevice = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      const { g_id, d_id } = req.params

      const check = await connection.query("Select gateway_id from devices where id = ?", d_id)
      if (JSON.parse(JSON.stringify(check)).length === 0) {
         res.json(`There is no Peripheral Device in DataBase with provided id: ${d_id}`)
      }
      else {
         if (JSON.parse(JSON.stringify(check))[0].gateway_id === Number(g_id)) {
            await connection.query("UPDATE devices SET gateway_id = ? Where id = ? AND gateway_id = ?", [null, d_id, g_id])
            res.json(`Peripheral device with id: ${d_id} correctly removed from Gateway with id: ${g_id}`)
         } else {
            res.status(404).json(`Gateway does not own a Perhipheral Device with provided id: ${d_id}`)
         }
      }
   } catch (error) {
      res.status(500).send(error.message)
   }
}

export const gatewaysController = {
   addGateway,
   getGateways,
   getGateway,
   deleteGateway,
   updateGateway,
   addDevice,
   removeDevice
}