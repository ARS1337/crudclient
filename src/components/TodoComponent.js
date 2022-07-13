import { list } from "postcss";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Dialog } from "@mui/material";
import DialogComponent from "./DialogComponent";

function TodoComponent(props) {
  const { user, setuser } = props;
  const [taskName, settaskName] = useState("");
  const [list, setlist] = useState([]);
  const [editDetails, seteditDetails] = useState("");
  const [dialogInput, setdialogInput] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getList = async () => {
    try {
      let res = await axios.post("http://localhost:3001/getalltodos", { user: user });
      if (res.data.status === 200) {
        if (res.data.res.length === 0) {
          enqueueSnackbar("No todos found, try adding a new todo");
        }
        setlist(res.data.res);
      } else {
        enqueueSnackbar("an error occurred");
      }
      console.log(res.data.res);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("An error occurred while fetching!");
    }
  };

  const addToList = async () => {
    let res = await axios.post("http://localhost:3001/settodo", { user: user, todo: taskName, status: "pending" });
    if (res.data.status === 200) {
      enqueueSnackbar("task added successfully");
    }
    await getList();
  };

  const handleDelete = async (id) => {
    let res = await axios.post("http://localhost:3001/removetodo", { id: id });
    if (res.data.status === 200) {
      enqueueSnackbar("task removed successfully");
    }
    await getList();
  };

  const handleUpdate = async (editDetails, input) => {
    let res = await axios.post("http://localhost:3001/updatetodo", {
      id: editDetails.id,
      newTodo: input,
    });
    if (res.data.status === 200) {
      enqueueSnackbar("task updated successfully");
    }
    seteditDetails("");
    await getList();
  };

  useEffect(() => {
    enqueueSnackbar("welcome " + user, { variant: "info" });
    getList();
  }, []);

  return (
    <div className="flex items-center justify-start flex-col bg-slate-300 h-[100vh] w-full p-8 font-thin">
        {editDetails && <DialogComponent editDetails = {editDetails} handleUpdate = {handleUpdate}/>}
      <div className="mb-12 mt-8 w-6/12 flex flex-row items-center">
        <input
          value={taskName}
          onChange={(e) => settaskName(e.target.value)}
          className="my-4 p-2 w-full text-xl rounded-lg outline-none text-orange-400"
        />
        <button className="bg-orange-400 p-2 mx-2 rounded-lg text-white px-6 text-xl" onClick={addToList}>
          Add
        </button>
      </div>
      {list.map((todoDetails) => {
        return (
          <div className="flex flex-row items-center justify-center  text-white p-4 rounded-3xl text-xl">
            <label className="px-4 mx-2 bg-orange-400 rounded-lg p-2">{todoDetails.todo}</label>
            <button
              className="px-4 mx-2 bg-orange-400 rounded-lg p-2"
              onClick={() => {
                handleDelete(todoDetails.id);
              }}
            >
              delete
            </button>
            <button
              className="px-4 mx-2 bg-orange-400 rounded-lg p-2"
              value={todoDetails}
              onClick={() => {
                seteditDetails(todoDetails);
              }}
            >
              edit
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TodoComponent;
