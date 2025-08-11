import { Task } from "../models/Task.js";

export const createTask = async (req, res, next) => {
    try {
        // Step 1: Handle completely empty body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        const { taskId, title, description } = req.body;

        if (typeof taskId !== "number" || isNaN(taskId) || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid required fields",
            });
        }


        const task = await Task.create({
            taskId,
            title,
            description,
            completed: false,
            userId: req.user._id,
        });

        res.status(200).json({
            success: true,
            message: "Task added successfully",
            task: {
                taskId: task.taskId,
                title: task.title,
                description: task.description,
                completed: task.completed,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllTask = async (req, res) => {
    try {
        const { search, completed } = req.query;

        const filter = { userId: req.user._id };

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        if (completed !== undefined) {
            filter.completed = completed === "true";
        }

        const tasks = await Task.find(filter);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};




export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ taskId: Number(req.params.id) });

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found",
            });
        }
        await Task.deleteOne(task);
        return res.status(200).json({
            success: true,
            message: "Deleted successfully",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.findOne({ taskId: Number(req.params.id) });
        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found",
            });
        }
        if (title !== undefined) {
            task.title = title;
        }
        if (description !== undefined) {
            task.description = description;
        }
        if (completed !== undefined) {
            task.completed = completed;
        }

        await task.save();
        return res.status(200).json({
            success: true,
            message: "Updated Successfully",
            task,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}