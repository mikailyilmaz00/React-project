import { Router } from 'express';
const router = Router();
import { getTasks, createTask, deleteTask } from '../controller/taskController.js'
const tasks = [];

router.route('/getTasks').get(getTasks);
router.route('/createTask').post(createTask);
router.route('/deleteTask').delete(deleteTask)




export default router;