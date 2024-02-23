import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'

// Registering a new user
export const registerUser = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({firstname, lastname, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Logging in a user
export const loginUser = async (req, res) => {

    const {email, password} = req.body

    try {
        const user = await UserModel.findOne({email: email});

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            validity? res.status(200).json(user): res.status(400).json("Wrong Password")
        }
        else {
            res.status(404).json("User not found")
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}