import { useRef, useState, useEffect } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000");
    let passwords = await req.json();
    setpasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
    });
  };

  const showPassword = () => {
    if (ref.current.classList.contains("fa-eye")) {
      ref.current.classList.remove("fa-eye");
      ref.current.classList.add("fa-eye-slash");
      passwordRef.current.type = "text";
    } else {
      ref.current.classList.remove("fa-eye-slash");
      ref.current.classList.add("fa-eye");
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id })
        });
      }

      const newPassword = { ...form, id: uuidv4() };
      setpasswordArray([...passwordArray, newPassword]);

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword)
      });

      localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]));

      await getPasswords();
      setform({ site: "", username: "", password: "" });

      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async (id) => {
    console.log("deleting password with id " + id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("editing password with id " + id);
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="px-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt;</span>
          Pass
          <span className="text-green-700">OP&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full text-black border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full text-black border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full text-black border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span className="absolute right-3 cursor-pointer top-1" onClick={showPassword}>
                <i ref={ref} className="fa-solid fa-eye"></i>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="group flex items-center gap-2 px-8 py-2 bg-green-600 text-black rounded-xl hover:bg-green-500 transition border-2 border-green-900"
          >
            <i className="fa-solid fa-user-lock text-2xl transition-transform duration-500 group-hover:rotate-180"></i>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center py-2 border border-white w-32">
                      <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                      <i
                        onClick={() => copyText(item.site)}
                        className="fa-solid fa-copy ml-2 cursor-pointer hover:scale-125 transition-transform"
                      ></i>
                    </td>
                    <td className="text-center py-2 border border-white w-32">
                      {item.username}
                      <i
                        onClick={() => copyText(item.username)}
                        className="fa-solid fa-copy ml-2 cursor-pointer hover:scale-125 transition-transform"
                      ></i>
                    </td>
                    <td className="text-center py-2 border border-white w-32">
                      {"*".repeat(item.password.length)}
                      <i
                        onClick={() => copyText(item.password)}
                        className="fa-solid fa-copy ml-2 cursor-pointer hover:scale-125 transition-transform"
                      ></i>
                    </td>
                    <td className="text-center py-2 border border-white w-32">
                      <i
                        onClick={() => editPassword(item.id)}
                        className="fa-solid fa-pen mx-2 cursor-pointer hover:text-blue-500 transition-transform hover:scale-125"
                      ></i>
                      <i
                        onClick={() => deletePassword(item.id)}
                        className="fa-solid fa-trash cursor-pointer hover:text-red-500 transition-transform hover:scale-125"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
