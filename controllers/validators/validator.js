
const IPV4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const validateEntry = (obj) => {
   for (const key in obj) {
      if (obj[key] === undefined || obj[key] === "") {
         return false
      }
   }
   return true
}


const validateIPAdrress = (ip) => {
   if(IPV4_REGEX.test(ip)) {
      return true
   }
   return false
}


export const validators = {
   validateEntry,
   validateIPAdrress
}