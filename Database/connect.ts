import 'dotenv/config'
import {Pool} from "pg"

const client = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
})

 
export {client}
