import { useEffect, useState } from "react";
import { FormInput } from "../components";
import { useCollection } from "../hooks/useCollection";
import { Form, useActionData } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { doc, deleteDoc } from "firebase/firestore";
import { useGlobalContext } from "../context/GlobalContext";
import { MdDoneOutline } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

export const action = async ({ request }) => {
  let todoData = await request.formData();
  let title = todoData.get("title");
  let targetTime = todoData.get("targetTime");
  return { title, targetTime };
};

function Todos() {
  const [targetTime, setTargetTime] = useState(null);
  const { user } = useGlobalContext();
  const dataTodo = useActionData();
  const { data, setData } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt"]
  );
  const handleDelete = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then(() => {
        toast.success("Deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleCompleted = (id, status) => {
    const todosRef = doc(db, "todos", id);
    updateDoc(todosRef, {
      completed: !status,
    });
  };
  useEffect(() => {
    if (dataTodo) {
      const newTodo = {
        ...dataTodo,
        completed: false,
        createdAt: serverTimestamp(),
        uid: user.uid,
        timeLeft: "00:00",
      };
      addDoc(collection(db, "todos"), newTodo)
        .then(() => {
          toast.success("New todo added!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [dataTodo]);
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = data.map((todo) => {
        const timeLeft = calculateTimeLeft(targetTime);
        return { ...todo, timeLeft, };
      });
      setData(updatedData);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);
  const calculateTimeLeft = (targetTime) => {
    const now = new Date();
    const target = new Date(now.toDateString() + " " + targetTime);
    const difference = target - now;
    // console.log(difference);
    if (difference == NaN) {
      return "00:00";
    }
    const hours = Math.floor((difference / 1000 / 3600) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <h2 className="text text-5xl">To-Do List</h2>

      <div className="flex flex-wrap gap-5 items-center justify-center">
        {data &&
          data.map((todo) => {
            return (
              <div
                key={todo.id}
                className="border bg-violet-500 border-black rounded-3xl py-10 px-10 max-w-3xl w-full h-[150px]"
              >
                <div className="flex  items-center">
                  <h1
                    className={`${
                      todo.completed ? "opacity-30 line-through" : "opacity-100"
                    } text-3xl text-black mr-4`}
                  >
                    {todo.title}
                  </h1>
                  <input
                    onChange={(e) => setTargetTime(e.target.value)}
                    name="targetTime"
                    className=" text-xl mt-1 ml-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-4 font-bold"
                    type="time"
                  />
                  {/* <span className="text-black text-xl mr-1">Time Left: </span>
                  <span className=" max-w-28  w-full h-7 rounded p-[2px] bg-slate-50 font-semibold">
                    {todo.timeLeft}
                  </span> */}
                  <div className="ml-auto  ">
                    <MdDoneOutline
                      onClick={() => handleCompleted(todo.id, todo.completed)}
                      className=" mb-1 w-9 h-9 p-2 rounded-full bg-slate-200 hover:bg-slate-400 transition active:scale-90"
                    />
                    <IoMdTrash
                      onClick={() => handleDelete(todo.id)}
                      className="w-9 h-9 p-2 rounded-full bg-slate-200 hover:bg-slate-400 transition active:scale-90"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Form className="flex items-center" method="post">
        <FormInput
          name="title"
          label="Create To-Do List"
          type="text"
          placeholder="title"
        />
        <button className=" border self-end text-2xl w-12 h-12 p-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition active:scale-90 font-bold">
          +
        </button>
      </Form>
    </div>
  );
}

export default Todos;
