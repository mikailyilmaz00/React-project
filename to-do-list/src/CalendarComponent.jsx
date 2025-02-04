import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { updateTask } from '../backend/controller/taskController';
// import { TodoItem } from './TodoItem';
// import { axios } from "axios"

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // fetching tasks 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getTasks')
        if (!response.ok) throw new Error('Failed to fetch tasks');

        const data = await response.json()
        const taskWithDate = data.map(task => ({
          ...task,
          task: task.title,
          date: new Date(task.date),
          completed: task.completed ?? false,
        }))
        setTasks(taskWithDate)
        console.log('KALDT')
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
  
  fetchTasks();
}, [selectedDate])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = async (task, date) => {
    console.log("kaldt", task, selectedDate)
    if (task) {
      setTasks([...tasks, { id: data.TaskId, date: date, completed: false }]);

      try {
        const response = await fetch('http://localhost:3000/api/createTask', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, date })
        });
      } catch (error) {
        console.log('Error', error);
        
      }
    
    }
  };


  // const toggleTaskCompletion = (index) => {
  //   setTasks((prevTasks) => )
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index].completed = !updatedTasks[index].completed;
  //   setTasks(updatedTasks);
  // };
  
  const toggleTaskCompletion = async (index) => {
    const updatedTasks = [...tasks]
    const updatedTask = updatedTasks[index]
    updatedTask.completed = !updatedTask.completed
    setTasks([...updatedTasks])

    try {
      const response = await fetch(`http://localhost:3000/api/updateTask/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTask.task,
          date: updatedTask.date.toISOString(),
          completed: updatedTask.completed,
        }),
      })
        if (!response.ok) {
          console.error('Failed to update task')
          return
        }
      
    } catch (error) {
      console.error('Error updating task:', error)
    }
}
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task, i) =>
  //       i === index ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  

  const deleteTodo = async (taskObj) => {
    console.log('delete task with id', taskObj)
    console.log('with id', taskObj.id)
    setTasks(tasks.filter((task) => task !== taskObj))
    if (!taskObj || !taskObj.id) {
      console.error("Error: Task ID is missing!");
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/deleteTask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({ id: taskObj.id }),
      })
      console.log('der sker noget');
    if (!response.ok) {
      console.error('Failed to delete the task')
      setTasks((prevTasks) => [...prevTasks, taskObj])
    }
    } catch (error) {
      console.error('Error deleting task:', error) 
      setTasks((prevTasks) => [...prevTasks, taskObj])
    }

  };

  
  
  
  return (
    <div className="calendar-container"> {/* Container for the whole calendar */}
      <h1 className="calendar-header">To-do List with Calendar</h1> {/* Header for the calendar */}
      
      {/* Calendar component with custom class */}
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="calendar"  // Custom class for calendar
        />
      </div>

      
      <p className="selected-date">
        Selected Date: {selectedDate.toDateString()}
      </p>

      <div className="task-input-container">
        <input
          type="text"
          id="task-input"
          placeholder="Add a task..."
          className="task-input"  // Custom class for the input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask(e.target.value, selectedDate);
              e.target.value = ''; // Clear input
              
            }
          }}
        />
      </div>

    
      <div className="task-list-container">
        <h3 className="task-list-header">Plans for {selectedDate.toDateString()}</h3>
        <ul className="task-list">
          {tasks
            .filter((taskObj) => taskObj.date.toDateString() === selectedDate.toDateString())
            .map((taskObj, index) => (
              <li key={index} className="task-item">             <input
                  type="checkbox"
                  className="task-checkbox"  // Checkbox class
                  checked={tasks.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span className={taskObj.completed ? 'completed' : ''}>
                {taskObj.task} 
                </span>
                <button 
                 className="delete-button"
        onClick={() => deleteTodo(taskObj)}>
            Delete 
            </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default CalendarComponent;