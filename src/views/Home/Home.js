import React, { useEffect, useState } from 'react';
import './Home.css';
import addIcon from "./add.png";
import TaskCard from '../../component/TaskCard/TaskCard';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') {
      setError('Please enter a task.');
      return;
    } else if (newTask.trim().length < 5) {
      setError('Task should be at least 5 characters long.');
      return;
    } else if (category.trim() === '') {
      setError('Please select a category.');
      return;
    } else {
      setError('');
    }

    const newTasks = [
      {
        title: newTask,
        category: category,
      },
      ...tasks
    ];

    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);

    setNewTask('');
    setCategory('');
  }

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  }

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div>
      <h1 className='app-heading'>To-Do App</h1>

      <div className='tasks-container'>
        {tasks.map((task, index) => (
          <TaskCard
            title={task.title}
            category={task.category}
            key={index}
            delFunction={() => deleteTask(index)}
            index={index}
          />
        ))}
      </div>
      <p className='error-message'>{error}</p>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Add a new task'
          className='task-input'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <select
          className='category-select'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Category</option>
          <option value='📚Study'>📚Study</option>
          <option value='🛍️Shopping'>🛍️Shopping</option>
          <option value='🎯Goals'>🎯Goals</option>
          <option value='🏊🏾Hobby'>🏊🏾Hobby</option>
        </select>

        <img
          src={addIcon}
          alt='Add'
          className='add-icon'
          onClick={addTask}
        />
      </div>
    </div>
  );
}

export default Home;