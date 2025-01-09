import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TodoItem } from './TodoItem';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (task) => {
    if (task) {
      setTasks([...tasks, { task, date: selectedDate, completed: false }]);
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTodo = (taskObj) => {
    setTasks(tasks.filter((task) => task !== taskObj))
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
              handleAddTask(e.target.value);
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
              <li key={index} className="task-item"> 
                <input
                  type="checkbox"
                  className="task-checkbox"  // Checkbox class
                  checked={taskObj.completed}
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
};

export default CalendarComponent;
