import bcrypt from "bcrypt";
import User from './../models/User.js'
import jwt from 'jsonwebtoken'
const signUp = async (req, res) => {
    const { name, email, phone, address, password, rePassword } = req.body;

    if (!password) {
        res.status(400).json({
            success: false,
            message: "Password is Required"
        });
    }
    if (password !== rePassword) {
        res.status(400).json({
            success: false,
            message: "Password does not match"
        });
    }
    if (!name) {
        res.status(400).json({
            success: false,
            message: "Name is Required"
        });
    }
    if (!email) {
        res.status(400).json({
            success: false,
            message: "Email is Required"
        });
    }
    if (!phone) {
        res.status(400).json({
            success: false,
            message: "Phone is Required"
        });
    }
    if (!address) {
        res.status(400).json({
            success: false,
            message: "Address is Required"
        });
    }

    const salt = bcrypt.genSaltSync(10);
    try {
        const newUser = new User({
            name,
            email,
            phone,
            address,
            password: bcrypt.hashSync(password, salt)
        });
        const saveUser = await newUser.save();
        return res.json({
            success: true,
            message: "Signup Successfully",
            data: {
                name: saveUser.name,
                email: saveUser.email,
                phone: saveUser.phone,
                address: saveUser.address,
            }
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false, message: "Email and Password is required"
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: "Please signup first before logging in" });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (isPasswordMatch) {
        const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.setHeader("Authorization", `Bearer ${jwtToken}`);

        return res.status(200).json({
            success: true,
            token: jwtToken,
            message: "Login successfully"
        });
    }
    else {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
}

export { signUp, login }