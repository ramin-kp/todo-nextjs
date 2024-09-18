import React, { useState } from "react";
import UpdatedTodoModal from "@/components/templates/todo/UpdatedTodoModal";
import { toast } from "react-toastify";

//styles
import styles from "@/styles/todos.module.scss";
import "react-toastify/dist/ReactToastify.css";

function UserPanel({ data }) {
  const [todos, setTodos] = useState(data);
  const [isShowModal, setIsShowModal] = useState(false);
  const [todoID, setTodoID] = useState("");
  //Fn
  const isCompleteHandler = async (id, completeModify) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isComplete: !completeModify }),
    });
    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const res = await fetch("/api/todos");
      const newData = await res.json();
      setTodos(newData);
    }
    console.log("res =>", res);
    console.log("data =>", data);
  };

  const deleteTodoHandler = async (id) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const res = await fetch("/api/todos");
      const newData = await res.json();
      setTodos(newData);
    }
  };

  console.log(todos);
  return (
    <main className={styles.todos}>
      <div>
        {todos.data.map((todo) => (
          <div
            className={
              todo.isComplete
                ? styles.todos__item__complete
                : styles.todos__item
            }
            key={todo._id}
          >
            <div className={styles.todos__title}>
              <h4>{todo.title}</h4>
              <p>{new Date(todo.updatedAt).toLocaleDateString("fa-ir")}</p>
            </div>
            <p style={{ color: "red" }}></p>
            <p>{todo.body}</p>
            <div className={styles.todos__buttons}>
              <button
                className={
                  todo.isComplete
                    ? styles.todos__complete__button__completed
                    : styles.todos__complete__button
                }
                onClick={() => isCompleteHandler(todo._id, todo.isComplete)}
              >
                {todo.isComplete ? "تکمیل شده" : "تکمیل"}
              </button>
              <button
                disabled={todo.isComplete}
                className={
                  todo.isComplete
                    ? styles.todos__updated__button__disable
                    : styles.todos__updated__button
                }
                onClick={() => {
                  setIsShowModal(true);
                  setTodoID(todo._id);
                }}
              >
                ویرایش
              </button>
              <button
                className={styles.todos__remove__button}
                onClick={() => deleteTodoHandler(todo._id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      {isShowModal && (
        <UpdatedTodoModal
          setIsShowModal={setIsShowModal}
          todoID={todoID}
          setTodos={setTodos}
        />
      )}
    </main>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/todos", {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });
  const todoData = await res.json();
  console.log("res =>", res);
  console.log("todoDAta", todoData);
  return { props: { data: todoData } };
}

export default UserPanel;
