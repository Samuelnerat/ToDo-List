import React, {useState} from 'react'
import { ToDoForm } from './ToDoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditToDoForm } from './EditToDoForm';
uuidv4(); 

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([])

  //  Adds a new to-do task to the todos 
  const addTodo = todo => {
    setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isediting: false}])
    console.log(todos)
  }

  // Toggles the completion status of a task.
  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed} : todo))
  }

  // Deletes a task.
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggles the editing mode for a task.
  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo ))
  }

  // Updates the task content when editing.
  const editTask = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
  }

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <ToDoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditToDoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo task={todo} key={index} 
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo} 
          editTodo={editTodo}/>
        )

      ))}
      
    </div>
  )
}
