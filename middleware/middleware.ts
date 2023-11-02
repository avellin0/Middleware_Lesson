import { config } from "dotenv";
config({ path: "/Users/Plogl/Lessons/Middleware/.env" });
import { Request,Response,NextFunction} from "express"
import {client} from "../Database/connect"
import {verify } from "jsonwebtoken";


export function AuthMiddleware(permissions?: string[]){

    interface DecodedToken{
        UserId: string,
        Access: string,
    }


    return async (req:Request,res:Response,next:NextFunction) => {

        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
           return res.status(400).json({message: "token não informado!"});
        }

        const token = authHeader.substring(7)



try{

        const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }

        const verificando = verify(token,MY_SECRET_KEY) as DecodedToken;



        const access = await fetchAccess(verificando.UserId);
        const access_name = await fetchAccessName(access.rows[0].access);

        const userPermissions = access_name.rows[0].name
        const haspermissions = permissions?.some((p) => userPermissions.includes(p))

        
        if(!haspermissions){
            return res.status(403).json({message: "permissão negada."})
        }
        
        async function fetchAccess(id:any) {
            const result = await client.query('SELECT access FROM employees_access WHERE employer = $1', [id]);
            if (result.rows.length === 0) {
                throw new Error("Access Not Found");
            }
            return result;
        }
    
        async function fetchAccessName(accessId:any) {
            const result = await client.query('SELECT name FROM access WHERE id = $1', [accessId]);
            if (result.rows.length === 0) {
                throw new Error("Access Name not Found");
            }
            return result;
        }

        return next()

        }catch(e){
            res.status(401).json({message: "deu merda!"})
        }

    }
}


