const express = require('express');
const router = express.Router();
// import {App} from "../models/appModel"
const App = require('../models/appModel');
// All tasks
router.get('/tasks', async (req, res) => {
    const tasks = await App.find();
    res.json(tasks);
});

// find task by id
router.get('/tasks/:id', async (req, res) => {
    const task = await App.findById(req.params.id);
    res.json(task);
});

//  create new task
router.post('/tasks', async (req, res) => {
    const task = new App(req.body);
    await task.save();
    res.json(task);
});

// edit the  existing task by id
router.patch('/tasks/:id', async (req, res) => {
    try {
        
        const task = await App.findOneAndUpdate({_id: req.params.id}, req.body ,{new:true} );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// router.post('/tasks/:id', async (req, res) => {
//     const task = await App.findById(req.params.id);
//     res.json(task);
// });

// delete the task by id
router.delete('/tasks/:id', async (req, res) => {
    await App.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router; 