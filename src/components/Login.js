import React, { useState } from "react";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="flex items-center justify-center h-[100vh] bg-slate-300 text-white">
      <div className="flex items-center justify-center flex-col gap-4 drop-shadow-xl bg-orange-300 p-8 pb-6 rounded-2xl">
        <div className="text-3xl font-thin tracking-wide mb-2">Login</div>
        <div className="flex items-center justify-between w-[100%]">
          <label className="pr-2 text-xl">Username:</label>
          <input
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="rounded-md p-1"
          />
        </div>

        <div className="flex items-center justify-between w-[100%]">
          <label className="pr-2 text-xl">Password:</label>
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="rounded-md p-1"
          />
        </div>

        <button className="bg-white p-2 rounded-md px-6 text-black font-light tracking-wide text-xl mt-2 focus:cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
