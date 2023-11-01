import {Request , Response, json} from "express"
import {client} from "../Database/connect"

export class FindUnique {
    async handle(req:Request, res:Response){
        const {email} = req.body;

        const research = await client.query('SELECT employer_id , name, phone ,email FROM employees WHERE email = $1', [email])
        res.send(research.rows)
    }
}
