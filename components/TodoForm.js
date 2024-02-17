import React, { useRef } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = (props) => {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    const todoDetail = {
      title: enteredTitle,
      description: enteredDescription,
      status: "incomplete",
    };

    props.onAddTodo(todoDetail);

    titleRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={formSubmitHandler}>
        <div>
          <label className={styles.formLabel}>Todo Title</label>
          <input type="text" className={styles.formInput} ref={titleRef} />
        </div>
        <div>
          <label className={styles.formLabel}>Todo Description</label>
          <input
            type="text"
            className={styles.formInput}
            ref={descriptionRef}
          />
        </div>
        <button type="submit" className={styles.formButton}>
          Add Todo
        </button>
        <button
          type="submit"
          className={styles.formButton}
          onClick={props.closeTodo}
        >
          Close
        </button>
      </form>
    </>
  );
};

export default TodoForm;
