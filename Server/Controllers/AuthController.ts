import { Request, Response } from 'express';
import UserModel, { User } from "../Models/UserModel.js";
import bcrypt from 'bcrypt';

// Registering a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, email, password, isAdmin }: User = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with the provided data
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false // Use provided isAdmin value or default to false
        });

        // Save the new user to the database
        await newUser.save();

        res.status(200).json(newUser); // Return the newly created user
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Logging in a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: { email: string, password: string } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            validity ? res.status(200).json(user) : res.status(400).json("Wrong Password");
        } else {
            res.status(404).json("User not found");
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};