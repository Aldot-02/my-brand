import { Request, Response } from 'express';
import UserModel, { User } from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, email, password, isAdmin }: User = req.body;

    try {


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        await newUser.save();

        res.status(200).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: { email: string, password: string } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (validity) {
                const secret = "PORTFOLIO"
                jwt.sign({email, id:user._id, isAdmin: user.isAdmin}, secret, {}, (err: any, token: any) => {
                    if(err) throw err
                    res.cookie("token", token, { sameSite: 'none' }).json({ token, isAdmin: user.isAdmin });
                })
            }
            else {
                res.status(400).json("Wrong Password");
            }

        } else {
            res.status(404).json("User not found");
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const getProfileInfo = async (req: Request, res: Response): Promise<void> => {
    const {token, secret} = req.cookies;

    if (!token || !secret) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    jwt.verify(token, secret, {}, (err: any, info) => {
        if(err) throw err;
        res.json(info)
    });
};


export const logoutRoute = async (req: Request, res: Response): Promise<void> => {
    if (!req.cookies.token) {
        res.status(400).json({ message: 'No token found. You are already logged out.' });
        return;
    }
    res.clearCookie('token').json({ message: 'Logout successful' });
};