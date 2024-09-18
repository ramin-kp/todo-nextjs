import React, { useState } from "react";
import { toast } from "react-toastify";

import styles from "@/styles/UpdatedTodoModal.module.scss";
import "react-toastify/dist/ReactToastify.css";

function UpdatedTodoModal({ setIsShowModal, todoID, setTodos }) {
  const [updateTodoData, setUpdateTodoData] = useState({
    title: "",
    body: "",
  });
  const modalDataHandler = (e) => {
    setUpdateTodoData({
      ...updateTodoData,
      [e.target.name]: e.target.value,
    });
  };

  const updateTodoHandler = async (e) => {
    e.preventDefault();
    if (
      !updateTodoData.title.trim() ||
      updateTodoData.title.length < 0 ||
      !updateTodoData.body.trim() ||
      updateTodoData.body.length < 0
    ) {
      toast.error("لطفا فیلد ها رو پرکنید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    const res = await fetch(`/api/todos/${todoID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTodoData),
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
      setIsShowModal(false);
    }
    console.log("res =>", res);
    console.log("data =>", data);
  };
  return (
    <div className={styles.modal}>
      <form className={styles.modal__form} onSubmit={updateTodoHandler}>
        <h2>تغییر اطلاعات تودو</h2>
        <div className={styles.modal__form__field}>
          <label htmlFor="title">عنوان:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={updateTodoData.title}
            onChange={modalDataHandler}
          />
        </div>
        <div className={styles.modal__form__field}>
          <label htmlFor="body">متن:</label>
          <input
            type="text"
            name="body"
            id="body"
            value={updateTodoData.body}
            onChange={modalDataHandler}
          />
        </div>
        <div>
          <button className={styles.modal__button__change} type="submit">
            ثبت
          </button>
          <button
            className={styles.modal__button__cancel}
            onClick={() => setIsShowModal(false)}
          >
            لغو
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatedTodoModal;
