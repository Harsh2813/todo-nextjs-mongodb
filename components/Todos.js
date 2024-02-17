import React, { useState } from "react";
import styles from "./Todos.module.css";
import { useRouter } from "next/router";
import TodoForm from "./TodoForm";

const Todos = (props) => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const router = useRouter();

  const addTodoHandler = async (todoDetails) => {
    //set data to mongodb
    try {
      const response = await fetch("/api/newTodo", {
        method: "POST",
        body: JSON.stringify(todoDetails),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("failed to add todo");
      }
      const data = await response.json();
      // Update the state with the new Todo

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };

  const taskCompleteHandler = async (id) => {
    try {
      const response = await fetch("/api/updateTodo", {
        method: "PATCH",
        body: JSON.stringify({ id: id, status: "complete" }), // Send todo item ID and new status
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }
      // Optionally, you can update the UI or perform any other actions upon successful completion
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      const response = await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ id: id }), // Send todo item ID
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // Optionally, you can update the UI or perform any other actions upon successful deletion
    } catch (error) {
      console.error(error);
    }
  };

  const closeTodo = () => {
    setShowTodoForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowTodoForm(true)}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          margin: "10px",
        }}
      >
        Add Todo
      </button>
      {showTodoForm && (
        <TodoForm closeTodo={closeTodo} onAddTodo={addTodoHandler} />
      )}
      <ul>
        {props.todo.map((item) => (
          <li key={item.id} className={styles.todoCard}>
            <div className={styles.todoContent}>
              <h3 className={styles.todoTitle}>{item.title}</h3>
              <p className={styles.todoDescription}>{item.description}</p>
            </div>
            <input
              type="checkbox"
              className={styles.completeCheckbox}
              id={`complete-${item.id}`}
              onChange={() => taskCompleteHandler(item.id)} // Add your complete task handler here
            />
            <label htmlFor={`complete-${item.id}`}>Complete</label>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteTodoHandler(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
