import { Request,Response} from "express";
import {client} from "../Database/connect"

export class GetUsers{
    async handle(req: Request, res:Response){  
    
    try{
        await client.connect()
        console.log("Connected")
        const result = await client.query('SELECT * FROM employees')
        console.table(result.rows);
        res.send(result.rows)
    }catch(e){
        console.log(`Something wrong happend here ${e}`)
    
    }finally{
          client.end()
            console.log("Disconnected")
        }

    }  
}