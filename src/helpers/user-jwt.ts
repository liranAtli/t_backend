import jwt, {sign} from "jsonwebtoken";


export const signUser = (user:any) => {

    const refreshToken = sign({
            id: user.id
        },
        "grant"
        , {
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        "grant",
        {
            expiresIn: "5m"
        }
    );

    return {accessToken, refreshToken};

}