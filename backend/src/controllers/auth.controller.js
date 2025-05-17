import bcryptjs from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma";


export const register=async(req, res )=>{
    const {email,name,password}=req.body;
    try {
        const existingUser= await db.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser){
            return res.status(400).json({
                "error": "user already exisit"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser= await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role: UserRole.USER
            }
        })
    
    } catch (error) {
        console.log(error);
        
    }
    
}
export const login=async(req, res )=>{

}
export const logout=async(req, res )=>{

}
export const check=async(req, res )=>{

    //user can check their profile

}