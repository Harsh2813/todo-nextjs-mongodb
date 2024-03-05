import TodoForm from "@/components/TodoForm";
import Todos from "@/components/Todos";
import React, { useState } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

const Homepage = (props) => {
  //const [todos, setTodos] = useState(props.todos);
  //const incompleteTodos = props.todos.filter(todo => todo.status !== 'complete');

  //   const [showTodoForm, setShowTodoForm] = useState(false);
  //   const router = useRouter();

  // const addTodoHandler = async (todoDetails) => {//set data to mongodb
  //   try {
  //     const response = await fetch("/api/newTodo", {
  //       method: "POST",
  //       body: JSON.stringify(todoDetails),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     if (!response.ok) {
  //       throw new Error("failed to add todo");
  //     }
  //     const data = await response.json();
  //     // Update the state with the new Todo

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   router.push('/');
  // };

  // const closeTodo = () => {
  //   setShowTodoForm(false);
  // };

  return (
    <>
      {/* <button onClick={() => setShowTodoForm(true)} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', margin: '10px'}}>Add Todo</button>
      {showTodoForm && <TodoForm closeTodo={closeTodo} onAddTodo={addTodoHandler} />} */}
      {console.log('line 42 exevuted')}
      <Todos todo={props.todos}/>
    </>
  );
};

export async function getStaticProps() { //fetched data from mongodb
  console.log('getstaticprops executed')
  const client = await MongoClient.connect(
    "mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/todo?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todoCollection = db.collection("todo");
  const todos = await todoCollection.find({status: 'incomplete'}).toArray();//Since toArray() returns a promise, you need to await it to get the actual array of todos.
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({//id is obj type key so we have to copy all in single object by making id string
        id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        status: todo.status
      }))
    },
    revalidate: 10,
  };
}

export default Homepage;
