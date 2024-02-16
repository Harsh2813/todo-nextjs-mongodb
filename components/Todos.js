import React from 'react'
import styles from './Todos.module.css';

const Todos = (props) => {
  return (
    <>
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
            onChange={() => handleComplete(item.id)} // Add your complete task handler here
          />
          <label htmlFor={`complete-${item.id}`}>Complete</label>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Todos
