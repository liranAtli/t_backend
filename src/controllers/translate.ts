import express, {Request, Response} from "express";
import {registerHandler} from "../handlers/register.handler";
import {validateRequest} from "../middlewares/validate-request";
import {authHandler} from "../handlers/auth.handler";
import {User} from "../schemas/user";
import {BadRequestError} from "../errors/bad-request-error";
import {Password} from "../helpers";
import {signUser} from "../helpers/user-jwt";


const router = express.Router();


router.get("/api/translate/", authHandler, validateRequest,
    async (req: Request, res: Response) => {

        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }
        // non-null assertion
        // It removes undefined and null from a type without doing any other option is "as string"
        const passwordMatch = await Password.compare(existingUser.password!, password);
        if (!passwordMatch) {
            throw new BadRequestError("Invalid credentials");
        }

        const {accessToken, refreshToken} = signUser(existingUser);

        res.cookie("refresh_token", refreshToken,{signed:true})
            .status(200)
            .type("application/json")
            .send({accessToken: accessToken});
    });


export {router as authController}