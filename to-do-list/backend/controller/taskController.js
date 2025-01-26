import taskModel from '../Model/taskModel.js';

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' }) 
    }
};

const createTask = async (req, res) => {
    console.log('kaldt')
    try {
        const { task, date} = req.body;
        console.log(task, date);
        //task id is not declared
        const taskId = await taskModel.createTask(task, date);
        res.status(201).json({ message: 'mission complete', taskId })
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' });
    }
}

const deleteTask = async (req, res) => {
    console.log('Received delete req with body', req.body)
    const { id } = req.body

    if (!id || isNaN(id)) {
        console.error("Invalid ID received:", id);
        return res.status(400).json({ error: "Invalid task ID" });
    }

   try {
    const result = await taskModel.deleteTask(id)
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found'})
    }
    res.status(200).json({ message: 'Task deleted successfully' })
   } catch (error) {
    console.error  ('Error deleting task:', error)
    res.status(500).json({ message: 'Internal server error' })  
   }
}


const updateTask = async (req, res) => {
    console.log('Put req lever')

    const taskId = req.params.id
    const { title, date, completed } = req.body

    console.log('Modtaget data', { taskId, completed, date, title })
    if (!taskId || !title || !date || typeof completed !== 'boolean') {
        console.log('INVALID VALUE')
        return res.status(400).json({ error: 'Missing task ID, task, date, or completed'})
    } 
       
    try {
    const update = await taskModel.updateTask(taskId, completed, title, date)
    if (!update || update.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
    console.error ('Error updating task', error)
    res.status(500).json({ message: 'Internal server error'})
    }
}
export {getTasks, createTask, deleteTask, updateTask};