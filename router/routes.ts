import {Router} from "express"
import {AuthMiddleware} from "../middleware/middleware"
import {SignIn} from "../Authorization/auth"
const route = Router();

import {GetUsers} from "../controller/CreateUser"
import {FindUnique} from "../controller/FindUnique"

const user = new GetUsers()
const unique = new FindUnique()

route.get("/users", user.handle);
route.get("/unique", AuthMiddleware(["admin"]), unique.handle);

route.post('/SignIn', SignIn)

export {route}
