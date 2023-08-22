import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./PasswordManager.css";

function PasswordManager() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/showPasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    const payload = {
      password: password,
      title: title,
    };
    Axios.post("http://localhost:5000/addPassword", payload);
  };

  const decryptPassword = (encryption) => {
    const payload = {
      password: encryption.password,
      iv: encryption.iv,
    };
    Axios.post("http://localhost:5000/decryptPassword", payload).then(
      (response) => {
        setPasswordList(
          passwordList.map((val) => {
            return val.id == encryption.id
              ? {
                  id: val.id,
                  password: val.password,
                  title: response.data,
                  iv: val.iv,
                }
              : val;
          })
        );
      }
    );
  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="password123"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="website"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button className="mybtn" onClick={addPassword}>Add Password</button>
      </div>
      <div className="Passwords">
        {passwordList.map((val) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PasswordManager;
