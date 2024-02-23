import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'


// Getting a User
export const getUser = async(req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const {password, ...otherCredentials} = user._doc
            res.status(200).json(otherCredentials)
        }
        else {
            res.status(404).json("User Doesn't exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// updating user's Information
export  const updateUser = async(req, res) => {
    const id = req.params.id;

    const {currentUserId, currentUserAdminStatus, password} = req.body;


    if(id=== currentUserId || currentUserAdminStatus) {
        try {

            if(password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("You are not allowed to Upate this Profile")
    }
}


// Deleting a User
export const deleteUser = async (req, res) => {
    const id = req.params.id

    const {currentUserId, currentUserAdminStatus} = req.body

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("Account deleted successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("You have no permission to Delete this Account")
    }
}