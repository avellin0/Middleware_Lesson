import {Pool} from "pg"

const client = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "company",
    password: "pico"
})

 
export {client}