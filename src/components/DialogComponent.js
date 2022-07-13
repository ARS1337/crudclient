import { Dialog } from "@mui/material";
import React, { useState } from "react";

function DialogComponent(props) {
  const { editDetails, handleUpdate } = props;
  const [dialogInput, setdialogInput] = useState(editDetails.todo || "");
  return (
    <Dialog open={editDetails} fullWidth>
      <div className="flex items-center justify-center flex-row  w-full p-4 outline-none bg-orange-300 text-white">
        <div>
          <label for="input">New Todo:</label>
          <input
          id="input"
            type="text"
            value={dialogInput}
            onChange={(e) => {
              setdialogInput(e.target.value);
            }}
            autoFocus
            className="mx-2 text-orange-400 rounded-lg p-2"
          />
        </div>

        <button
          onClick={() => {
            handleUpdate(editDetails, dialogInput);
          }}
        >
          Save
        </button>
      </div>
    </Dialog>
  );
}

export default DialogComponent;
