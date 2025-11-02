import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import crypto from "crypto";

interface IUser{
    _id?:ObjectId;
    user_photo?:string;
    first_name?:string;
    last_name?:string;
    gender?:string;
    mobile_number?:number;
    email:string;
    username:string;
    hashed_password:string;
    salt?:string;
    bod?:string;
    role?:string;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        first_name:{
            type:String,
            trim:true,
        },
        last_name:{
            type:String,
            trim:true,
        },
        gender:{
            type:String,
            enum:['m','f'],
        },
        user_photo:{
            type:String,
            default:"default.png"
        },
        bod:String,
        hashed_password: {
            type: String,
        },
        salt: {
            type: String,
        },
        email: {
            type: String,
            lowercase:true,
            unique:true
        },
        username: {
            type: String,
        },
        mobile_number:{
            type:Number
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps:true,
    }
);

UserSchema.virtual("password")
  .set(function (this: any, password: string) {
    this._password = password;
    this.salt = this.makesalt();
    this.hashed_password = this.encrptPassword(password);
  })
  .get(function (this: any) {
    return this._password;
  });

UserSchema.methods = {
    authenticate: function (plainText: string) {
        return this.encrptPassword(plainText) === this.hashed_password;
    },

    encrptPassword: function (password: string) {
        if (!password) return "";
        try {
        return crypto
            .createHmac("sha1", this.salt)
            .update(password)
            .digest("hex");
        } catch (err) {
        return "";
        }
    },

    makesalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
};

UserSchema.set("toJSON", {virtuals:true}) //virtuals:true will help to include virtual fields in API

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;