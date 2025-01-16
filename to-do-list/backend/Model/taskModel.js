import database from '../db.js';
import mysql from 'mysql2';
// import toDo from '../../src/App.jsx';
// import express from 'express';
const db = mysql

const getTasks = async () => {
    try {
        const [rows] = await database.query('SELECT * FROM tasks');
        return rows;
} catch (error) {
        console.error('Error fetching tasks:', error.message);
        throw error;
}
}

const createTask = async (title, date) => {
    
    try {
        console.log(date, title);
        if (!title || !date) {
            throw new Error('Title and date are required');

        }
        const [result] = await database.query('INSERT INTO tasks (title, date) VALUES (?, ?)', [title, new Date(date)    ]);
        console.log(result)
        return result.insertId;
} catch (error) {
        console.error('Error creating task:', error.message);
        throw error;
}
};

const deleteTask = async (id) => {  
    
    const query = 'DELETE FROM tasks WHERE id = ?';
    return new Promise((resolve, reject) => {
      database.query(query, [id], (error, result) => {
        if (error) {
            console.error('Database error', error)
            reject(err)
          } else {
           console.log('Delete result', result)
              resolve(result);
            }
          })
      });
    }

export default {getTasks, createTask, deleteTask};



