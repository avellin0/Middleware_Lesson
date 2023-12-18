import { Request,Response} from "express";
import {client} from "../Database/connect"

export class GetUsers{
    async handle(req: Request, res:Response){  
    
    try{
        console.log("Connected")
        const result = await client.query('SELECT * FROM employees')
        res.send(result.rows)
    }catch(e){
        console.log(`Something wrong happend here ${e}`)
    
    }finally{
            console.log("Disconnected")
        }

    }  
}
