import express from "express";
import cors from "cors";
import {json} from "body-parser";

import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

import "express-async-errors";

import {errorHandler} from "./middlewares/error-handler";

import {registerController} from "./controllers/register";
import {authController} from "./controllers/auth";
import {NotFoundError} from "./errors/not-found-error";


const app = express();


app.use(cors());
app.use(json());
app.use(cookieParser("secret"));
app.use(
    cookieSession({
        signed: true,
        secure: true,
        secret: 'secret'
    })
);


// @Controllers
app.use(registerController);
app.use(authController);


app.all("*", async () => {
    throw new NotFoundError();
});


app.use(errorHandler);

export {app}

