import React, {useState} from "react";
import { MongoClient } from "mongodb";
import styles from '../components/Todos.module.css';
import { useRouter } from "next/router";

const CompletedTodos = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const deleteTodoHandler = async (id) => {
    setIsLoading(true);
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
    router.push(router.asPath);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <h1 style={{marginLeft: '750px'}}>Deleting...</h1>}
      <ul>
        {props.todos.map((item) => (
          <li key={item.id} className={styles.todoCard}>
            <div className={styles.todoContent}>
              <h3 className={styles.todoTitle}>{item.title}</h3>
              <p className={styles.todoDescription}>{item.description}</p>
            </div>
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

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/todo?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todoCollection = db.collection("todo");
  const todos = await todoCollection.find({ status: "complete" }).toArray(); //Since toArray() returns a promise, you need to await it to get the actual array of todos.
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        //id is obj type key so we have to copy all in single object by making id string
        id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
      })),
    },
    revalidate: 10,
  };
};

export default CompletedTodos;
