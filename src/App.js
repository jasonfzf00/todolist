import { useState, useEffect } from "react";
import axios from 'axios';
import { Todo } from "./components/todo";
import { Form } from "./components/form";
import { LoginForm } from "./components/login"

function App() {
  const [todo, setTodo] = useState([]);
  const [addTodo, setAddTodo] = useState('');


  // Get todolist through get request using AXIOS
  // Empty dependency array ensures this effect runs only once
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/items');
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleFormChange = (inputValue) => {
    setAddTodo(inputValue);
  }

  // Add new task and refresh the list
  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/add', {
        name: addTodo
      });
      fetchData();
    } catch (error) {
      console.error('Error adding new todo item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCheckComplete = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/item/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error checking item:', error);
    }
  };

  const handleLogin = ({ email, password }) => {
    // NOT FINISHED
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <div className="todoapp stack-large">
        <h1>Todo List</h1>
        <div>
          <LoginForm onLogin={handleLogin} />
        </div>
        <Form userInput={addTodo} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
        <div class="spotify-container">
          <iframe class="spotify" src="https://open.spotify.com/embed/track/4KGGeE7RJsgLNZmnxGFlOj?utm_source=generator" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
        <h2 id="list-heading">{todo.length} tasks remaining</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
          <Todo listOfTodos={todo} onDelete={handleDelete} onCheck={handleCheckComplete} />
        </ul>
      </div>
    </>
  );
}

export default App;
