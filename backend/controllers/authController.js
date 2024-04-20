import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {

    const { fullName, userName, password, confirmPassword, gender } = req.body
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All field are required." })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't matched" })
    }
    const user = await User.findOne({ userName })
    if (user) {
      return res.status(400).json({ error: "Username already exist. Try different" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture: gender == "male" ? maleProfilePicture : femaleProfilePicture
    })


    if (newUser) {
      generateTokenAndSetCookie(newUser._id,res)
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePicture: newUser.profilePicture
      });
    } else {
      res.status(400).json({error: "Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ error: "Interval Server Error" })
  }
};

export const login = async (req, res) => {
  try {
    const {userName, password} = req.body;
   const user = await User.findOne({ userName });
   const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
   if (!user || !isPasswordCorrect) {
     return res.status(400).json({error: "Invalid Username or Password"})
   }
   generateTokenAndSetCookie(user._id, res);
   res.status(200).json({
     _id: user._id,
     fullName: user.fullName,
     userName: user.userName,
     profilePicture: user.profilePicture
   })


 } catch (error) {
  console.log("Error in login controller", error.message)
  res.status(500).json({ error: "Interval Server Error" })
 }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully." })
    
  } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({ error: "Interval Server Error" })
  }
}