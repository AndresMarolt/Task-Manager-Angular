import { List, Task } from '../models/index.js'

export const getLists = (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    })
}
 
export const postList = (req, res) => {
    const {title} = req.body;
    const newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        res.send(listDoc)
    })
}

export const updateLIst = (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
}

export const deleteList = (req, res) => {
    List.findOneAndRemove({ _id: req.params.id})
        .then((removedListDoc) => {
            res.send(removedListDoc)
        })
}

// ------------------------------------------------------------------------------------------------------------------------------------

export const getListTasks = (req, res) => {
    Task.find({
        listId: req.params.listId 
    }).then((tasks) => {
        res.send(tasks);
    })
}

export const postTask = (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    })
}

export const updateTask = (req, res) => {
    const {listId, taskId} = req.params;

    Task.findByIdAndUpdate({
        _id: taskId,
        listId: listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
}

export const deleteTask = (req, res) => {
    const {listId, taskId} = req.params;
    Task.findOneAndRemove({
        _id: taskId,
        listId: listId
    }).then((deletedTaskDoc) => {
        res.send(deletedTaskDoc)
    })
}

export const getTasksFromList = (req, res) => {
    const {listId, taskId} = req.params;
    Task.findOne({
        _id: taskId,
        listId: listId
    }).then((task) => {
        res.send(task); 
    })
}