const express = require('express')
const app = express()

const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
require("dotenv").config({ path: envPath });

app.listen(process.env.PORT || 3000, () => {
    console.log(`server started on ${process.env.PORT || 3000}`)
})
const router = require('./routes/index')
app.use("/",router)
