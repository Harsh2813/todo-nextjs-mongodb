// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import TodoForm from "@/components/TodoForm";

// const index = () => {
//   const router = useRouter();

//   const addTodoHandler = async (todoDetails) => {
//     //set data to mongodb
//     try {
//       const response = await fetch("/api/newTodo", {
//         method: "POST",
//         body: JSON.stringify(todoDetails),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!response.ok) {
//         throw new Error("failed to add todo");
//       }
//       const data = await response.json();

//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//     router.replace("/");
//   };

//   return (
//     <>
//         <TodoForm onAddTodo={addTodoHandler} />
//     </>
//   );
// };

// export default index;
