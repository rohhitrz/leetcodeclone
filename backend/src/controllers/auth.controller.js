import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "user already exisit",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    res.status(201).json({
      success:true,
      message: "user created Successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.name,
      },
    });
  } catch (error) {
    console.error("error creating user", error);
    res.status(500).json({
      error: "error creating user",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        error: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        erorr: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    res.status(200).json({
      success:true,
      message: "user logged In succesfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("error in login your account", error);
    res.status(500).json({
      error: "Error Creating User",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    console.error("error in loggin out user", error);
    res.status(500).json({
      error: "Error Creating User",
    });
  }
};
export const check = async (req, res) => {
  //user can check their profile

  try{
    res.status(200).json({
      success:true,
      message:"user authenticated successfully",
      user:req.user
    })

  }catch(error){
    console.error(error)
    res.status(500).json({
      error: "error checking user"
    })

  }
};
