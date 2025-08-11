import express from "express";
import { createTask, deleteTask, getAllTask, updateTask } from "../controllers/TaskController.js";
import { protect } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/create",protect, createTask);
router.get("/all",protect,getAllTask);
router.delete("/delete/:id",protect,deleteTask);
router.put("/update/:id",protect,updateTask);


export default router;