import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [failedMessage, setFailedMessage] = useState("");
  const [errList, setErrList] = useState([]);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  function getUser(e) {
    setErrList([]);
    let inputValue = e.target.value;
    let newUSer = { ...user };
    newUSer[`${e.target.id}`] = inputValue;
    setUser(newUSer);
  }

  function getCurrentError(key) {
    for (const err of errList) {
      if (err.context.key === key) {
        return err.message;
      }
    }
    return "";
  }
  async function SubmitForm(e) {
    e.preventDefault();
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(18).max(60).required(),
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
    } else {
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signup/",
        user
      );
      if (data.errors) {
        setFailedMessage(data.message);
      } else {
        navigate("/login");
      }
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
          {/* {errList.map((err, index) => (
            <div className="alert alert-danger" key={index}>
              {err.message}
            </div>
          ))} */}
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control my-3"
            id="first_name"
            onChange={getUser}
          />
          {getCurrentError("first_name").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("first_name")}
            </div>
          )}
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control my-3"
            id="last_name"
            onChange={getUser}
          />
          {getCurrentError("last_name").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("last_name")}
            </div>
          )}
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control my-3"
            id="age"
            onChange={getUser}
          />
          {getCurrentError("age").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCurrentError("age")}</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control my-3"
            id="email"
            onChange={getUser}
          />
          {getCurrentError("email").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCurrentError("email")}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-3"
            id="password"
            onChange={getUser}
          />
          {getCurrentError("password").length === 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentError("password")}
            </div>
          )}

          <button className="btn btn-outline-info mx-auto">Register</button>
        </form>
      </div>
    </>
  );
}
