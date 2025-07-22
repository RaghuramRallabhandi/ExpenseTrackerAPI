import jwt from "jsonwebtoken";
import User from "../models/User.js";
//generating jwt token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

//register user
export const registerUser = async (req, res) => {
    const { name, email, password, profileImageUrl } = req.body;
    //check if all fields are filled
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const userExists = await User.findOne({ email });
        //check if user already exists
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        //create new user
        const user = await User.create({
            name,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({message:`User ${user.name} registered successfully`});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//login user
export const loginUser = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists && (await userExists.comparePassword(req.body.password))) {
        res.status(200).json({
            id: userExists._id,
            userExists,
            token: generateToken(userExists._id),
        });
        console.log(`User ${userExists.name} logged in successfully`);
    } else {
        res.status(400).json({ message: "Invalid email or password" });
    }
}

export const getUserInfo = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    try{
        if (user) {
            res.status(200).json(user);
            console.log(`User ${user.name} info fetched successfully`);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}   