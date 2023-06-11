import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), title: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const handleTaskChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const handleSaveTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTaskTitle } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskChange(task.id)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <button onClick={() => handleSaveTask(task.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                <button onClick={() => handleEditTask(task.id, task.title)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
