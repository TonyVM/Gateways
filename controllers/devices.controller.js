import { getConnectionMySQL } from "../database/mysql.js";
import { validators as validator } from './validators/validator.js'

const addDevice = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      const { uid, vendor, date_created, status } = req.body
      let { gateway_id } = req.body 
      if (gateway_id === "") gateway_id = null
      const device = { uid, vendor, date_created, status, gateway_id }
      let enumStatus = ['online', 'offline']
      let checkValidEnum = enumStatus.find(e => e === status)

      if (!validator.validateEntry({ uid, vendor, date_created, status })) {
         res.status(400).json({ message: "Bad request. Please fill all fields" })
      } else {
         const checkExistenceUid = await connection.query("Select uid from devices where uid = ?", uid)
         if (checkExistenceUid.length !== 0) {
            res.status(400).json({ "message": `There is already a record with provided uid: ${uid}. Please provide a different one` })
         } else {
            if (checkValidEnum !== undefined) {
               await connection.query("INSERT into devices SET ?", device)
               res.status(200).json("Device added successfully")
            } else {
               res.status(400).json("Invalid status value provided. Value must be online/offline")
            }
         }
      }
      // res.json("wokring on")
   } catch (error) {
      res.status(500).send(error.message)
   }
}

const getDevices = async (req, res) => {
   try {
      const connection = await getConnectionMySQL()
      const result = await connection.query("SELECT * FROM devices")
      result.length > 0 ?
         res.status(200).send(result) :
         res.status(200).json({ "message": "There is no record in Database" })
   } catch (error) {
      res.status(500).send(error.message)
   }
}

const getDevice = async (req, res) => {
   try {
      const { id } = req.params
      const connection = await getConnectionMySQL()
      const result = await connection.query("SELECT * FROM devices WHERE id = ?", id)

      result.length > 0 ?
         res.status(200).json(result) :
         res.status(404).json({ message: `There is no record on table with provided id: ${id}` })
   } catch (error) {
      res.status(500).send(error.message)
   }
}

const deleteDevice = async (req, res) => {
   try {
      const { id } = req.params
      const connection = await getConnectionMySQL()
      const result = await connection.query(`DELETE FROM devices WHERE id = ?`, id)
      if (result.affectedRows > 0) {
         res.status(200).json(`Record successfully deleted`)
      }
      else {
         res.status(404).json(`There is no record on table with provided id: ${id}`)
      }
   } catch (error) {
      res.status(500).send(error.message)
   }
}

const updateDevice = async (req, res) => {
   try {
      const { id } = req.params
      const { uid, vendor, date_created, status } = req.body
      const connection = await getConnectionMySQL()
      if (!validator.validateEntry({ uid, vendor, date_created, status })) {
         res.status(400).json({ message: "Bad request. Please fill all fields" })
      } else {
         const checkExistence = await connection.query("Select uid, id from devices where uid = ? AND id <> ?", [uid, id])

         if (checkExistence.length > 0) {
            res.status(400).json({ "message": `There is already a record with provided uid: ${uid}. Please provide a different one` })
         } else {
            const device = { uid, vendor, date_created, status }
            await connection.query("UPDATE devices SET ? WHERE id = ?", [device, id])
            res.status(200).json("Device data successfully updated")
         }
         // res.json(checkExistence.length)
      }
   } catch (error) {
      res.status(500).send(error.message)
   }
}

export const deviceController = {
   addDevice,
   getDevice,
   getDevices,
   deleteDevice,
   updateDevice
}

