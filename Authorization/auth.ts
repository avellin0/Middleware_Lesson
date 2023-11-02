import { config } from "dotenv";
config({ path: "/Users/Plogl/Lessons/Middleware/.env" });
import { Request, Response } from "express";
import { client } from "../Database/connect";
import { sign } from "jsonwebtoken";

export const SignIn = async (req: Request, res: Response) => {
    try {
        const { employer_id } = req.body;

        const employer = await fetchEmployer(employer_id);
        const employer_info = await fetchEmployeeInfo(employer.rows[0].employer);
        const access = await fetchAccess(employer_id);
        const access_name = await fetchAccessName(access.rows[0].access);

        const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }

        const token = sign({
            UserId: employer_info.rows[0].employer_id,
            Access: access_name.rows[0].name,
        }, MY_SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "1h",
        });

   
        res.json(token);
        
    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }

    async function fetchEmployer(id:any) {
        const result = await client.query('SELECT employer FROM employees_access WHERE employer = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error("Employer not found");
        }
        return result;
    }

    async function fetchEmployeeInfo(employerId:any) {
        const result = await client.query('SELECT * FROM employees WHERE employer_id = $1', [employerId]);
        if (result.rows.length === 0) {
            throw new Error("Employer Information not found");
        }
        return result;
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
};
