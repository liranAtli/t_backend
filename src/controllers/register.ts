import express, {Request, Response} from "express";
import {User} from '../schemas/user';
import {BadRequestError} from "../errors/bad-request-error";
import {signUser} from "../helpers/user-jwt";
import {registerHandler} from "../handlers/register.handler";
import {validateRequest} from "../middlewares/validate-request";


const router = express.Router();


router.post("/api/users/register",
    registerHandler,
    validateRequest,
    async (req: Request, res: Response) => {
        const {firstName, lastName, email, password} = req.body;

        console.log({firstName, lastName, email, password});

        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }

        const user = User.build({firstName, lastName, email, password});
        await user.save();

        const {accessToken, refreshToken} = signUser(user);

        res.cookie("refresh_token", refreshToken).status(201).type("application/json").send({accessToken: accessToken})

    });


export {router as registerController}