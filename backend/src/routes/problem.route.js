import exporess from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem,getProblems,getProblembyId,updateProblembyId,deleteProblembyId,getAllProblemsSolvedByUser } from "../controllers/problem.controller.js";

const ProblemRoutes=exporess.Router();

ProblemRoutes.post("/create-problem",authMiddleware, checkAdmin, createProblem)
ProblemRoutes.get("/get-all-problems",authMiddleware,getProblems);
ProblemRoutes.get("/get-problem/:id",authMiddleware,getProblembyId);
ProblemRoutes.put("/update-p roblem/:id",authMiddleware,checkAdmin,updateProblembyId)
ProblemRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblembyId)
ProblemRoutes.get("/get-solved-problems", authMiddleware, getAllProblemsSolvedByUser)



export default ProblemRoutes;