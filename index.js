import app from "./app.js";


const main = () => {
   app.listen(app.get("port"), () => {
      console.log(`App runing on http://localhost:${app.get("port")}`)
   })
}

main()
