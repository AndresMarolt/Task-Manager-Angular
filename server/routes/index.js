import express from 'express'
import { getLists, postList, updateLIst, deleteList, getListTasks, postTask, updateTask, deleteTask, getTasksFromList } from '../controllers/index.js';

const router = express.Router();

router.get('/lists', getLists);
router.post('/lists', postList);
router.patch('/lists/:id', updateLIst);
router.delete('/lists/:id', deleteList);


router.get('/lists/:listId/tasks', getListTasks);
router.post('/lists/:listId/tasks', postTask);
router.patch('/lists/:listId/tasks/:taskId', updateTask)
router.delete('/lists/:listId/tasks/:taskId', deleteTask)
router.get('/lists/:listId/tasks/:taskId', getTasksFromList)

export default router;