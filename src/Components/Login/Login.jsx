import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ decodeToken }) {
  let navigate = useNavigate();
  const [failedMessage, setFailedMessage] = useState("");
  const [errList, setErrList] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginFlag, setLoginFlag] = useState(false);
  function getUser(e) {
    setErrList([]);
    let inputValue = e.target.value;
    let newUSer = { ...user };
    newUSer[`${e.target.id}`] = inputValue;
    // console.log(newUSer)
    setUser(newUSer);
  }
  async function SubmitForm(e) {
    e.preventDefault();
    setLoginFlag(true);
    let schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "eg"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[a-z0-9]{4,8}$/i)
        .required(),
    });
    let joiResponse = schema.validate(user, { abortEarly: false });

    if (joiResponse.error) {
      setErrList(joiResponse.error.details);
      setLoginFlag(false);
    } else {
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signin/",
        user
      );
      if (data.message === "incorrect password") {
        setFailedMessage(data.message);
      } else {
        localStorage.setItem("token", data.token);
        decodeToken();
        navigate("/");
      }
      setLoginFlag(false);
    }
  }
  return (
    <>
      <div className="w-75 mx-auto my-3">
        {failedMessage.length === 0 ? (
          ""
        ) : (
          <div className="alert alert-danger ">{failedMessage}</div>
        )}
        <form onSubmit={SubmitForm}>
          {errList.map((err, index) => (
            <div className="alert alert-danger" key={index}>
              {err.message}
            </div>
          ))}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control my-3"
            id="email"
            onChange={getUser}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-3"
            id="password"
            onChange={getUser}
          />

          <button className="btn btn-outline-info mx-auto">
            {loginFlag ? <i className="fa-solid fa-spinner fa-spin"></i> : " "}
            Login
          </button>
        </form>
      </div>
    </>
  );
}
