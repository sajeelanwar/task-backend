const express = require("express")
const Tasks = require("../models/tasks")
const { verifyToken } = require("../middlewares")
const { getRandomId } = require("../config/global")

const router = express.Router()

router.post("/create", verifyToken, async (req, res) => {
    try {
        const { title, dueDate, description, priority, status } = req.body
        const { uid } = req
        const id = getRandomId()

        const taskData = { id, uid, title, dueDate, description, priority, status }

        const task = new Tasks(taskData)
        await task.save()

        res.status(201).json({ message: "A new task has been successfully created", task })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

router.get("/all", verifyToken, async (req, res) => {
    try {
        const { uid } = req

        const tasks = await Tasks.find({ uid })

        res.status(200).json({ message: "All tasks fetched successfully", tasks })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

router.get("/single/:id", verifyToken, async (req, res) => {
    try {
        const { uid } = req
        const { id } = req.params

        const task = await Tasks.findOne({ uid, id })

        res.status(200).json({ message: "Task fetched successfully", task })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

router.patch("/update", verifyToken, async (req, res) => {
    try {
        const { id, title, dueDate, description, priority, status, isCompleted } = req.body
        const { uid } = req

        const taskData = { id, title, dueDate, description, priority, status, isCompleted }

        const updatedTask = await Tasks.findOneAndUpdate({ uid, id }, taskData, { new: true })

        res.status(200).json({ message: "Task has been successfully updated", task: updatedTask })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const { uid } = req
        const { id } = req.params

        const task = await Tasks.findOneAndDelete({ uid, id })

        res.status(200).json({ message: "Task deleted successfully", task })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

module.exports = router