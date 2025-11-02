import passport_jwt from "passport-jwt";
import { Request, Response } from "express";

const JwtStrategy = passport_jwt.Strategy;

export const passportInit = (passport: any) => {
  const jwtExtractor = function (req: Request) {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  };

  const options = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    //@ts-ignore
    new JwtStrategy(options, (jwtPayload, done) => {
      //@ts-ignore
      Users.findOne({ _id: jwtPayload._id }).then((currUser: any) => {
        if (currUser) {
          done(null, currUser);
        }
      });
    }),
  );
};