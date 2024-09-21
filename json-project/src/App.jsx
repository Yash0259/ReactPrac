import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  const url = "http://localhost:3000/Task";

  useEffect(() => {
    showTask();
  },[]);

  //show data
  const showTask = () => {
    axios.get(url)
      .then((res) => {
        setTasks(Array.isArray(res.data) ? res.data : []); 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //add a task 
  const addTask = () => {
    try {
      if (inputValue.trim() === '') {
        alert('Please enter a task');
        return;
      }
      axios.post(url, { task: inputValue.trim(), status: false })
        .then((res) => {
          setTasks(res.data);
          setInputValue("");
          showTask();
        });
    } catch (error) {
      console.log(error);
    }
  }

  //update task 
  const updateTask = (id) => {
    try {
      axios.put(`${url}/${id}`, { status: true })
      .then(()=>{
       setTasks(tasks.map((task)=>
      task.id === id ? {...task,status:true} : task));
      })
    } catch (error) {
      console.log(error);
    }
  }

  //delete task 
  const deleteTask = (id)=>{
    try{
      axios.delete(`${url}/${id}`)
      .then(()=>{
        setTasks(tasks.filter((task)=>task.id !== id ));
      }
    )
    }catch(error){
      console.log(error);
    }
  }

  // get current tasks for pagination 
  

  return (
    <div className="taskApp">
      <h2>Task App</h2>
      <div>
        <input
          type="text"
          placeholder='Enter a Task'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addTask}>AddTask</button>
      </div>
      <div>
      <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.task}</h3>
                <h5>{task.status ? "Completed" : "Pending"}</h5>
                <button onClick={() => updateTask(task.id)}>Mark as Completed</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </ul>

 
      </div>
    </div>

  );
}
export default App;



