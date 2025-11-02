import Users from "../../models/Users";
import { Response, Request, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";

export const signup = (req: Request, res: Response) => {
    const { username, email, password } = req.body;
  
    Users.findOne({ email: email })
      .then((user: any) => {
        if (user) {
          return res.status(400).json({
            error: "Email is taken",
          });
        }

        const newUser = new Users({
            username,
            email,
            password,
        });
  
        newUser
          .save()
          .then((user: any) => {
            return res.status(200).json({
              message: `${username} is enrolled successfully. Welcome to the party!!`,
            });
          })
          .catch((err) => {
            if (err) {
              return res.status(405).json({
                error: err,
              });
            }
          });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            error: "Email is taken",
          });
        }
      });
};

export const signin = (req: Request, res: Response) => {
    const { email, password } = req.body;
    Users.findOne({ email })
      .then((user: any) => {
        if (!user.authenticate(password)) {
          return res.status(400).json({
            error: "Email and password do not match",
          });
        }
        console.log(user);
        const jwtToken = sign({ _id: user._id }, process.env.JWT_SECRET ?? "", {
          expiresIn: "7h",
        });
  
        res.cookie("jwt", jwtToken, {
          expires: new Date(Date.now() + 7 * 60 * 60 * 1000),
          httpOnly: true,
          secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        });
  
        return res.json({
          jwtToken,
          user: user,
        });
      })
      .catch((err) => {
        if (err) {
          return res.status(400).json({
            error: "User does not exist. Please signup",
            err,
          });
        }
      });
};